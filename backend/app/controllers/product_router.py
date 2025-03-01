from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select

from models.product import Product
from models.category import Category

from schema.product_schema import *
from schema.category_schema import *
from schema.product_category_schema import *

router = APIRouter(prefix="/product", tags=["Products"])

@router.get("/")
async def get_all_products(session:Session = Depends(get_session)):
    statement = select(Product)
    result = session.exec(statement).all()
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay productos registrados"
        )
        
    return result

@router.get("/{id}")
async def get_all_products(id:int ,session:Session = Depends(get_session)):
    productStatement = (select(Product)
                        .where(Product.id == id))
    product = session.exec(productStatement).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay productos registrados"
        )
        
    product_response = {
        "id":product.id,
        "name":product.name,
        "price":product.price,
        "id_category":product.id_category,
        "description":product.description,
        "stockMin":product.stockMin,
        "stockMax":product.stockMax,
        "stockCurrent":product.stockCurrent,
        "category":product.category
    }
    
    return product_response

@router.post("/create")
async def create_categories(anNewProduct:ProductCategorySchema, session:Session = Depends(get_session)):
    
    productStatement = (select(Product)
                 .where(Product.id == anNewProduct.product.id))
    categoryStatement = (select(Category).where(Category.id == anNewProduct.category.id))
    
    anProduct = session.exec(productStatement).first()
    anCategory = session.exec(categoryStatement).first()
    
    if anProduct:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Este producto ya esta registrado"
        )
    
    newProduct = Product(**anNewProduct.product.model_dump())
    
    newProduct.id_category = anCategory.id
    newProduct.category = anCategory
    
    anCategory.products.append(newProduct)
    
    
    session.add(newProduct)
    session.add(anCategory)
    session.commit()
    session.refresh(newProduct)
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Producto creado con exito"
    )
         

@router.post("/searchByName")
async def search_a_product(productSearch:ProductSearchModelSchema, session:Session=Depends(get_session)):
    # Devuelve todos los productos registrados
    if not productSearch.name and productSearch.id_category == 0: 
        statement = select(Product)
        result = session.exec(statement).all()
        return result

    # devuelve todos los productos de cierta categoria
    elif not productSearch.name and productSearch.id_category > 0:
        statement = (select(Product)
                     .where(Category.id == productSearch.id_category))
        result = session.exec(statement).all()
        return result
    
    # devuelve solo el producto que se escriba si la categorie es 0(todos)
    elif productSearch and productSearch.id_category == 0:        
        statement = (select(Product)
                     .where(Product.name.ilike(f"%{productSearch.name}%")))
        result = session.exec(statement).all()
        return result
    
    # devuelve un productos de cierta categoria
    elif productSearch.name and productSearch.id_category>0: 
        statement = (select(Product)
        .where(Product.id_category == productSearch.id_category,
            Product.name.ilike(f"%{productSearch.name}%")))
        result = session.exec(statement).all()
        return result

@router.put("/updateProduct")
async def update_a_product(productModel:ProductUpdateModelSchema, session:Session=Depends(get_session)):
    statement = select(Product).where(Product.id == productModel.id)
    
    product = session.exec(statement).first()
    
    product.price = productModel.price
    product.stockCurrent = productModel.stockCurrent
    product.stockMax = productModel.stockMax
    product.description = productModel.description
    
    session.add(product)
    session.commit()
    session.refresh(product)

    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Producto actualizado con exito"
    )

    