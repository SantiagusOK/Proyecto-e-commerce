from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select

from models.product import Product
from models.category import Category

from schema.product_schema import *
from schema.category_schema import *

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    result = session.exec(select(Category)).first()
    
    if result:
        return result.products
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay categorias registradas"
        )

@router.post("/create")
async def create_categories(anNewCategorie:CategorySchema, session:Session = Depends(get_session)):
    statement = (select(Category)
                 .where(func.lower(Category.name) == anNewCategorie.name.lower()))
    category = session.exec(statement).first()
    
    if category:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Esta categoria ya esta registrado")
        
    category = Category(**anNewCategorie.model_dump())
    
    session.add(category)
    session.commit()
    session.refresh(category)
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Categoria creado con exito")