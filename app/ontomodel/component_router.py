import sqlalchemy.exc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_async_session
from app.models.models import Component, ComponentAssociation
from app.ontomodel.schemas import *
from app.ontomodel.utils import isComponentWithNameExist, isComponentWithIdExist

router = APIRouter(
    prefix="/ontomodel",
    tags=["Component"]
)


@router.get("")
async def get_components_by_id(component_id: int, session: AsyncSession = Depends(get_async_session)):
    # try:
    query = select(Component).where(Component.id == component_id)
    result = await session.execute(query)
    component = result.scalars().first()

    query = select(Component).join(ComponentAssociation,
                                   Component.id == ComponentAssociation.child_id).where(
        ComponentAssociation.parent_id == component_id)
    print(query)
    # session.query(Component).join(
    #     ComponentAssociation, Component.id == ComponentAssociation.child_id
    # ).filter(
    #     ComponentAssociation.parent_id == component_id
    # ).all()
    result = await session.execute(query)
    component_dict = component.__dict__
    component_dict['child'] = list()
    for child in result.scalars().all():
        component_dict['child'].append({"id": child.id, "name": child.name})
    return component_dict
    # except Exception:
    #     raise HTTPException(status_code=500, detail={
    #         "status": "error",
    #         "data": None,
    #         "details": None
    #     })


@router.get("/name")
async def get_components_by_name(component_name: str, session: AsyncSession = Depends(get_async_session)):
    try:
        # Query the database for components with the specified name
        query = select(Component).where(Component.name == str(component_name.strip()))
        result = await session.execute(query)
        return result.scalars().all()
    except Exception:
        # Передать ошибку разработчикам
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": None
        })


@router.post("/add")
async def add_specific_component(new_component: componentCreate, session: AsyncSession = Depends(get_async_session)):
    component_dict = new_component.dict()
    # Сheck that this name is not occupied
    if await isComponentWithNameExist(str(component_dict['name']), session):
        raise HTTPException(status_code=400, detail={
            "status": "error",
            "data": None,
            "details": f"Component with name \"{component_dict['name']}\" already exist"
        })

    # Check if all components in names_of_heirs exist
    for heir_name in component_dict['names_of_heirs']:
        if not await isComponentWithNameExist(str(heir_name), session):
            raise HTTPException(status_code=400, detail={
                "status": "error",
                "data": None,
                "details": f"Component with name \"{heir_name}\" does not exist"
            })
    # If all components exist, create the new component
    stmt = insert(Component).values(name=component_dict['name'], description=component_dict['description'],
                                    creator_id=component_dict['creator_id'], date=component_dict['date'],
                                    data=component_dict['data'])
    result = await session.execute(stmt)
    new_component_id = result.inserted_primary_key[0]
    await session.commit()

    # Add associations to the component_association table
    for heir_name in component_dict['names_of_heirs']:
        # heir = session.query(Component).filter(Component.name == heir_name).first()
        query = select(Component.id).where(Component.name == str(heir_name)).limit(1)
        heir = await session.execute(query)
        await session.commit()
        try:
            for row in heir:
                stmt = insert(ComponentAssociation).values(parent_id=new_component_id, child_id=row[0])
                await session.execute(stmt)
                await session.commit()  # можно сделать после цикла?
        except Exception:
            # УДАЛИТЬ СОЗДАННЫЙ КОМПОНЕНТ
            raise HTTPException(status_code=500, detail={
                "status": "error",
                "data": None,
                "details": f"It is not possible to create a connection for the component \"{heir_name}\""
            })
    return {
        "status": "success",
        "data": None,
        "details": None
    }


@router.post("/update")
async def update_component(updating_component: componentUpdate, session: AsyncSession = Depends(get_async_session)):
    component_dict = updating_component.dict()
    # Check that this name is not occupied
    if not await isComponentWithIdExist(int(component_dict['id']), session):
        raise HTTPException(status_code=400, detail={
            "status": "error",
            "data": None,
            "details": f"Component with id:{component_dict['id']} does not exist"
        })

    # Update component
    stmt = update(Component).values(name=component_dict['name'], description=component_dict['description'],
                                    data=component_dict['data']).where(
        Component.id == int(component_dict['id']))
    await session.execute(stmt)
    await session.commit()
    return {
        "status": "success",
        "data": None,
        "details": None
    }


@router.post("/connect")
async def add_connection(edge: addComponentsConnection, session: AsyncSession = Depends(get_async_session)):
    if not await isComponentWithIdExist(edge.parent_id, session):
        raise HTTPException(status_code=400, detail={
            "status": "error",
            "data": None,
            "details": f"Component with id:{edge.parent_id} does not exist"
        })
    if not await isComponentWithIdExist(edge.child_id, session):
        raise HTTPException(status_code=400, detail={
            "status": "error",
            "data": None,
            "details": f"Component with id:{edge.child_id} does not exist"
        })
    # проверить соответствие DAG
    try:
        stmt = insert(ComponentAssociation).values(parent_id=edge.parent_id, child_id=edge.child_id)
        await session.execute(stmt)
        await session.commit()
        return {
            "status": "success",
            "data": None,
            "details": None
        }
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(status_code=400, detail={
            "status": "error",
            "data": None,
            "details": f"It is not possible to create such a connection"
        })


@router.post("/disconnect")
async def delete_connection(edge: addComponentsConnection, session: AsyncSession = Depends(get_async_session)):
    stmt = delete(ComponentAssociation).where(ComponentAssociation.parent_id == edge.parent_id,
                                              ComponentAssociation.child_id == edge.child_id).returning(
        ComponentAssociation.parent_id)
    result = await session.execute(stmt)
    await session.commit()
    return {
        "status": "success",
        "data": {"quantity": len(result.scalars().all())},
        "details": None
    }
