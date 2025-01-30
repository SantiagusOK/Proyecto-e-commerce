from fastapi import APIRouter, HTTPException, status, Depends
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products
from models.categories import CategorieModel, Categories

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_all_products(session:Session = Depends(get_session)):
    return session.exec(select(Products)).all()


@router.post("/create")
async def create_categories(anNewProduct:ProductModel, session:Session = Depends(get_session)):
    if type(search_value(anNewProduct, session)) != Products:
        newProduct = Products(**anNewProduct.model_dump())
        session.add(newProduct)
        session.commit()
        session.refresh(newProduct)
        return newProduct
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Este producto ya esta agregado"
        )
    
def search_value(value:ProductModel ,session:Session):
    result = session.exec(select(Products)).all()
    for product in result:
        if value.name == product.name:
            return value
    return None