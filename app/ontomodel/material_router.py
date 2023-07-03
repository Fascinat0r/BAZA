import sqlalchemy.exc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_async_session
from app.models.models import Component, ComponentAssociation, MaterialAssociation, Material
from app.ontomodel.schemas import *
from app.ontomodel.utils import isComponentWithNameExist, isComponentWithIdExist

router = APIRouter(
    prefix="/mat",
    tags=["Material"]
)

@router.get("")
async def get_components_by_id(material_id: int, session: AsyncSession = Depends(get_async_session)):
    # try:
    query = select(Material).where(Material.id == material_id)
    result = await session.execute(query)
    material = result.scalars().first()
    return material
    # except Exception:
    #     raise HTTPException(status_code=500, detail={
    #         "status": "error",
    #         "data": None,
    #         "details": None
    #     })