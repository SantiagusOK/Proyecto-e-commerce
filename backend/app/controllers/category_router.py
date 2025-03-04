from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import selectinload

from db.connect import get_session
from sqlmodel import Session, select

from schema.category_schema import CategorySchema
from schema.category_response import CategoryResponse

from models.category import Category

from services.category_service import CategoryService

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/",response_model=list[CategoryResponse])
async def get_all_categories(session:Session = Depends(get_session)):
    return CategoryService.get_all_categories(session)

@router.post("/create")
async def create_categories(anNewCategorie:CategorySchema, session:Session = Depends(get_session)):
    return CategoryService.create_category(session, anNewCategorie)