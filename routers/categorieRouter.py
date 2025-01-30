from fastapi import APIRouter, HTTPException, status, Depends
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products
from models.categories import CategorieModel, Categories

router = APIRouter(prefix="/categories", tags=["Categorie"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    return session.exec(select(Categories)).all()

@router.post("/create")
async def create_categories(anNewCategorie:CategorieModel, session:Session = Depends(get_session)):
    if type(search_value(anNewCategorie, session)) != Categories:
        newCategories = Categories(**anNewCategorie.model_dump())
        session.add(newCategories)
        session.commit()
        session.refresh(newCategories)
        return newCategories
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esta categoria ya esta agregada"
        )
    
def search_value(value:CategorieModel ,session:Session):
    result = session.exec(select(Categories)).all()
    for categorie in result:
        if value.name == categorie.name:
            return value
    
    return None