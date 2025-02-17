from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products, ProducstSearchModel, ProductUpdateModel
from models.categories import CategorieModel, Categories

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_all_products(session:Session = Depends(get_session)):
    statement = select(Products, Categories).join(Categories, Products.categories == Categories.id)
    result = session.exec(statement).all()
    return build_product_category(result)


@router.post("/create")
async def create_categories(anNewProduct:ProductModel, session:Session = Depends(get_session)):
    
    statement = select(Products).where(func.lower(Products.name) == anNewProduct.name.lower())
    anProduct = session.exec(statement).all()
    
    print(anProduct)
    if not anProduct:
        newProduct = Products(**anNewProduct.model_dump())
        session.add(newProduct)
        session.commit()
        session.refresh(newProduct)
        
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Producto creado con exito"
        )
    else:
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Este producto ya esta registrado"
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
    statement = select(Products, Categories).join(Categories, Products.categories == Categories.id).where(Products.id == id)
    
    result = session.exec(statement).all()
    

    product = build_product_category(result)
    
    return product

@router.post("/searchByName/")
async def search_a_product(productSearch:ProducstSearchModel, session:Session=Depends(get_session)):
    
    # Devuelve todos los productos registrados
    if not productSearch.name and productSearch.categorie <= 0: 
        statement = select(Products, Categories).join(Categories, Products.categories==Categories.id)
        result = session.exec(statement).all()
        return build_product_category(result)
    
    # devuelve todos los productos de cierta categoria
    elif not productSearch.name and productSearch.categorie > 0:
        statement = select(Products, Categories).join(Categories, Products.categories==Categories.id).where(
            Products.categories == productSearch.categorie)
        result = session.exec(statement).all()
        # return result
        # product = 
        return build_product_category(result)
    
    # devuelve solo el producto que se escriba si la categorie es 0(todos)
    elif productSearch and productSearch.categorie == 0:
        statement = select(Products, Categories).join(Categories, Products.categories==Categories.id).where(
            func.lower(Products.name) == productSearch.name)
        result = session.exec(statement).all()
        return build_product_category(result)
    
    # devuelve todos los productos que escriba de cierta categoria
    elif productSearch.name and productSearch.categorie>0: 
        statement = select(Products, Categories).join(Categories, Products.categories==Categories.id).where(
            Products.categories == productSearch.categorie,
            func.lower(Products.name) == productSearch.name)
        result = session.exec(statement).all()
        return build_product_category(result)


def build_product_category(result):
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

@router.put("/updatePrice")
async def update_a_product(productModel:ProductUpdateModel, session:Session=Depends(get_session)):
    
    statement = select(Products).where(Products.id == productModel.id)
    product = session.exec(statement).first()
    product.price = productModel.price
    product.stock += productModel.stock
    
    session.add(product)
    session.commit()
    session.refresh(product)
    
    
    return product
    
    