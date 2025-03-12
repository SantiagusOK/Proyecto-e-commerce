from fastapi import APIRouter, status, Depends
from db.connect import get_session
from sqlmodel import Session
from schema.product_schema import ProductCreateSchema
from schema.product_schema import ProductResponse
from schema.product_schema import ProductUpdateSchema
from services.product_service import ProductService

router = APIRouter(prefix="/product", tags=["Products"])

@router.get("/", response_model=list[ProductResponse],status_code=status.HTTP_200_OK)
async def get_all_products(session:Session = Depends(get_session)):
    return ProductService.get_all_products(session)

@router.get("/{id_product}",response_model=ProductResponse, status_code=status.HTTP_200_OK)
async def get_all_products(id_product:int ,session:Session = Depends(get_session)):
    return ProductService.get_product(session,id_product)

@router.post("/create",status_code=status.HTTP_201_CREATED)
async def create_product(anNewProduct:ProductCreateSchema, session:Session = Depends(get_session)):
    
    return ProductService.create_product(session,anNewProduct)
       
@router.put("/updateProduct",status_code=status.HTTP_200_OK)
async def update_a_product(productModel:ProductUpdateSchema, session:Session=Depends(get_session)):
    print(f"--------------------{productModel}")
    return ProductService.update_a_product(session, productModel)