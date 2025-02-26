from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.product import ProductModel, Product
from models.category import CategoryModel, Category

router = APIRouter(prefix="/categories", tags=["Categorie"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    result = session.exec(select(Category)).all()
    
    if result:
        return result
    else:
        return {"error": "un error"}

@router.post("/create")
async def create_categories(anNewCategorie:CategoryModel, session:Session = Depends(get_session)):
    
    statement = select(Category).where(func.lower(Category.name) == anNewCategorie.name.lower())
    category = session.exec(statement).first()
    
    if category:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Esta categoria ya esta registrado"
        )  
    category = Category(**anNewCategorie.model_dump())
    session.add(category)
    session.commit()
    session.refresh(category)
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Categoria creado con exito"
    )
    
def search_value(value:CategoryModel ,session:Session):
    result = session.exec(select(Category)).all()
    for categorie in result:
        if value.name == categorie.name:
            return value
    
    return None