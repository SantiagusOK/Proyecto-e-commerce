from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlmodel import Session, func, select

from schema.category_schema import *

from models.category import Category

class CategoryService:
    @staticmethod
    
    def get_all_categories(session:Session):
        
        statement = (select(Category)
                        .options(selectinload(Category.products)))
        categories = session.exec(statement).all()
        if not categories:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay categorias registradas" )

        return categories
    
    def create_category(session:Session, anNewCategorie:CategorySchema):
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
        
        return {"message" : "Categoria creado con exito"}   