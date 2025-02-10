from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products, ProducstSearchModel
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

@router.get("/getAllProducts+categories")
async def get_all_products_categories(session:Session = Depends(get_session)):
    result = session.exec(select(Products, Categories).join(Categories, Products.categories == Categories.id)).all()
    products_with_categories = [
            {
                "id": product.id,
                "name": product.name,
                "stock": product.stock,
                "price": product.price,
                "categorie": {
                    "id": category.id,
                    "name": category.name
                }
            }
            for product, category in result
        ]
    return products_with_categories

    

@router.get("/{id}")
async def getAnProduct(id:int, session:Session=Depends(get_session)):
    
    result = session.exec(select(Products, Categories).join(Categories, Products.categories==Categories.id).where(Products.id == id))
    
    # result = session.exec(select(Products, Categories).join(Categories, Products.categories == Categories.id)).all()
    products_with_categories = [
            {
                "id": product.id,
                "name": product.name,
                "stock": product.stock,
                "price": product.price,
                "categorie": {
                    "id": category.id,
                    "name": category.name
                }
            }
            for product, category in result
        ]
    print(products_with_categories)
    return products_with_categories

@router.get("/searchByName/")
async def search_a_product(productSearch:ProducstSearchModel, session:Session=Depends(get_session)):

    if productSearch.name=="" and productSearch.categorie==0: 
        statement = select(Products)
    
    elif productSearch.name=="" and productSearch.categorie>0: 
        statement = select(Products).where(
            func.lower(Products.categories == productSearch.categorie))
        
    elif not productSearch.name=="" and productSearch.categorie>0: 
        statement = select(Products).where(
            Products.categories == productSearch.categorie,
            func.lower(Products.name == productSearch.name))

    productResult = session.exec(statement).all()
    return productResult

@router.get("/searchCategorie/")
async def search_a_product(productSearch:ProducstSearchModel, session:Session=Depends(get_session)):

    if productSearch.categorie=="": 
        statement = select(Products)
    
    else :
        statement = select(Products).where(Products.categories == productSearch.categorie)

    productResult = session.exec(statement).all()
    return productResult
# statement = select(Products).where(
#             func.lower(Products.name) == productSearch.name,
#             Products.categories == productSearch.categorie)
def search_value(value:ProductModel ,session:Session):
    result = session.exec(select(Products)).all()
    for product in result:
        if value.name == product.name:
            return value
    return None

