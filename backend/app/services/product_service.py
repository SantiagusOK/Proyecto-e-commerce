from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from fastapi import HTTPException, status

from models.product import Product
from models.category import Category

from schema.product_category_schema import ProductCategorySchema
from schema.Product_update_schema import ProductUpdateModelSchema

class ProductService:
    @staticmethod
    
    def get_all_products(session:Session):
        statement = (select(Product)
                 .options(selectinload(Product.category)))
        result = session.exec(statement).all()

        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay productos registrados"
            )
            
        return result
    
    def get_product(session:Session, id_product:int):
        productStatement = (select(Product)
                        .where(Product.id == id_product))
        product = session.exec(productStatement).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Producto no existe, o no encontrado"
            )
        print(product)
        return product
    
    def create_product(session:Session, anNewProduct:ProductCategorySchema):
        
        productStatement = (select(Product)
                            .where(Product.id == anNewProduct.product.id))
        categoryStatement = (select(Category)
                            .where(Category.id == anNewProduct.category.id))
        
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
        
        return {"message" : "Producto creado con exito"}
    
    def update_a_product(session:Session, productModel:ProductUpdateModelSchema):
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