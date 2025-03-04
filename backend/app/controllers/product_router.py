from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import selectinload
from db.connect import get_session
from sqlmodel import Session, select

from models.product import Product
from models.category import Category

from schema.product_schema import ProductModelSchema
from schema.category_schema import CategorySchema
from schema.product_category_schema import  ProductCategorySchema
from schema.product_response import ProductResponse
from schema.Product_update_schema import ProductUpdateModelSchema

from services.product_service import ProductService

router = APIRouter(prefix="/product", tags=["Products"])

@router.get("/", response_model=list[ProductResponse],status_code=status.HTTP_200_OK)
async def get_all_products(session:Session = Depends(get_session)):
    return ProductService.get_all_products(session)

@router.get("/{id_product}",response_model=ProductResponse, status_code=status.HTTP_200_OK)
async def get_all_products(id_product:int ,session:Session = Depends(get_session)):
    return ProductService.get_product(session,id_product)

@router.post("/create",status_code=status.HTTP_201_CREATED)
async def create_categories(anNewProduct:ProductCategorySchema, session:Session = Depends(get_session)):
    return ProductService.create_product(session,anNewProduct)
       
@router.put("/updateProduct",status_code=status.HTTP_200_OK)
async def update_a_product(productModel:ProductUpdateModelSchema, session:Session=Depends(get_session)):
    return ProductService.update_a_product(session, productModel)
    

    
# @router.post("/searchByName",response_model=list[ProductResponse], status_code=status.HTTP_200_OK)
# async def search_a_product(productSearch:ProductSearchModelSchema, session:Session=Depends(get_session)):
#     # Devuelve todos los productos registrados
#     if not productSearch.name and productSearch.id_category == 0: 
#         statement = (select(Product)
#                      .options(selectinload(Product.category)))
#         result = session.exec(statement).all()
#         return result

#     # devuelve todos los productos de cierta categoria
#     elif not productSearch.name and productSearch.id_category > 0:
#         statement = (select(Product)
#                      .join(Category)
#                      .options(selectinload(Product.category))
#                      .where(Category.id == productSearch.id_category))
#         result = session.exec(statement).all()
#         return result
    
#     # devuelve solo el producto que se escriba si la categorie es 0(todos)
#     elif productSearch and productSearch.id_category == 0:        
#         statement = (select(Product)
#                      .options(selectinload(Product.category))
#                      .where(Product.name.ilike(f"%{productSearch.name}%")))
#         result = session.exec(statement).all()
#         return result
    
#     # devuelve un productos de cierta categoria
#     elif productSearch.name and productSearch.id_category>0: 
#         statement = (select(Product)
#                      .options(selectinload(Product.category))
#                      .where(Product.id_category == productSearch.id_category,
#                             Product.name.ilike(f"%{productSearch.name}%")))
#         result = session.exec(statement).all()
#         return result