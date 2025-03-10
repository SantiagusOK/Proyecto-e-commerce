from fastapi import APIRouter, Depends, status
from db.connect import get_session
from sqlmodel import Session
from schema.category_schema import CategorySchema, CategoryResponse

from services.category_service import CategoryService

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/",response_model=list[CategoryResponse])
async def get_all_categories(session:Session = Depends(get_session)):
    return CategoryService.get_all_categories(session)

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_categories(anNewCategorie:CategorySchema, session:Session = Depends(get_session)):
    return CategoryService.create_category(session, anNewCategorie)