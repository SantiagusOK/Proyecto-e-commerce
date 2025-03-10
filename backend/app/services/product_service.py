from sqlalchemy.orm import selectinload
from sqlmodel import Session, func, select
from fastapi import HTTPException, status
from models.product import Product
from models.category import Category
from schema.product_schema import ProductCreateSchema
from schema.product_schema import ProductUpdateSchema

class ProductService:
    @staticmethod
    def get_all_products(session:Session):
        statement = (select(Product)
                 .options(selectinload(Product.category)))
        result = session.exec(statement).all()

        if not result:
            return {"message" : {"No hay productos registrados" : result}}
            
        return result

    @staticmethod   
    def get_product(session:Session, id_product:int):
        productStatement = (select(Product)
                        .where(Product.id == id_product))
        product = session.exec(productStatement).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Producto no existe, o no encontrado"
            )
        return product

    @staticmethod  
    def create_product(session:Session, anNewProduct:ProductCreateSchema):
        
        productStatement = (select(Product)
                            .where(func.lower(Product.name) == anNewProduct.product.name.lower()))
        anProduct = session.exec(productStatement).first()
        if anProduct:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Este producto ya esta registrado"
            )
        
        categoryStatement = (select(Category)
                            .where(func.lower(Category.name)== anNewProduct.category.name.lower()))
        anCategory = session.exec(categoryStatement).first()
        if not anCategory:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Categoria no encontrada"
            )
        
        newProduct = Product(**anNewProduct.product.model_dump())
        
        newProduct.id_category = anCategory.id
        newProduct.category = anCategory
        
        anCategory.products.append(newProduct)
        
        session.add(newProduct)
        session.add(anCategory)
        session.commit()
        session.refresh(newProduct)
        
        return {"message" : "Producto creado con exito"}

    @staticmethod
    def update_a_product(session:Session, productModel:ProductUpdateSchema):
        statement = (select(Product)
                 .where(Product.id == productModel.id))
        product = session.exec(statement).first()
        
        product.price = productModel.price
        product.stockCurrent = productModel.stockCurrent
        product.stockMax = productModel.stockMax
        product.description = productModel.description
        
        session.add(product)
        session.commit()
        session.refresh(product)

        return {"message":"Producto actualizado con exito"}