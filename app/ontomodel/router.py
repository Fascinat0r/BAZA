from fastapi import APIRouter, Depends
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_async_session
from app.models.ontomodel import component
from app.ontomodel.schemas import componentCreate

router = APIRouter(
    prefix="/ontomodel",
    tags=["Component"]
)


@router.get("/")
async def get_specific_components(component_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(component).where(component.c.id == component_id)
    result = await session.execute(query)
    return result.all()


@router.post("/")
async def add_specific_components(new_component: componentCreate, session: AsyncSession = Depends(get_async_session)):
    stmt = insert(component).values(**new_component.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}
