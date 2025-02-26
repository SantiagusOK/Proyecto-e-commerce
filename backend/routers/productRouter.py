from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.product import ProductModel, Product, ProductSearchModel, ProductUpdateModel
from models.category import CategoryModel, Category

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_all_products(session:Session = Depends(get_session)):
    statement = select(Product)
    result = session.exec(statement).all()
    
    response = [
        {
            "idProduct": products.id,
            "stock":products.stock,
            "name":products.name,
            "price":products.price,
            "category":products.category
            
        }
        for products in result
    ]
    
    return response

@router.post("/create")
async def create_categories(anNewProduct:ProductModel, session:Session = Depends(get_session)):
    
    statement = select(Product).where(func.lower(Product.name) == anNewProduct.name.lower())
    anProduct = session.exec(statement).first()
    
    print(anProduct)
    if anProduct:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Este producto ya esta registrado"
        )  
    newProduct = Product(**anNewProduct.model_dump())
    
    statementCategorie = select(Category).where(Category.id == anNewProduct.categories)
    categoriesResult = session.exec(statementCategorie).first()
    
    newProduct.category = categoriesResult
    
    session.add(newProduct)
    session.commit()
    session.refresh(newProduct)
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Producto creado con exito"
    )
         

@router.get("/getAllProducts+categories")
async def get_all_products_categories(session:Session = Depends(get_session)):
    result = session.exec(select(Product, Category).join(Category, Product.categories == Category.id)).all()
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
    statement = select(Product).where(Product.id == id)
    result = session.exec(statement).all()
    reponse = [
        {
            "name":products.name,
            "price":products.price,
            "stock":products.stock,
            "category":products.category
        }
        for products in result
    ]
    
    return reponse[0]

@router.post("/searchByName/")
async def search_a_product(productSearch:ProductSearchModel, session:Session=Depends(get_session)):
    # Devuelve todos los productos registrados
    if not productSearch.name and productSearch.categorie == 0: 
        statement = select(Product)
        result = session.exec(statement).all()
        return result

    # devuelve todos los productos de cierta categoria
    elif not productSearch.name and productSearch.categorie > 0:
        statement = (select(Product, Category)
                     .join(Category, Product.categories==Category.id)
                     .where(Product.categories == productSearch.categorie))
        result = session.exec(statement).all()
        return build_product_category(result)
    
    # devuelve solo el producto que se escriba si la categorie es 0(todos)
    elif productSearch and productSearch.categorie == 0:        
        statement = (select(Product, Category)
        .join(Category, Product.categories==Category.id)
        .where(
            Product.name.ilike(f"%{productSearch.name}%")))
        result = session.exec(statement).all()
        # return result
        return build_product_category(result)
    
    # devuelve todos los productos que escriba de cierta categoria
    elif productSearch.name and productSearch.categorie>0: 
        statement = (select(Product, Category)
        .join(Category, Product.categories==Category.id)
        .where(Product.categories == productSearch.categorie,
            Product.name.ilike(f"%{productSearch.name}%")))
        result = session.exec(statement).all()
        return build_product_category(result)


def build_product_category(result):
    products_with_categories = [
            {
                "idProduct": product.id,
                "name": product.name,
                "stock": product.stock,
                "price": product.price,
                "category": product.category
            }
            for product, categories in result
        ]
    return products_with_categories

@router.put("/updateProduct")
async def update_a_product(productModel:ProductUpdateModel, session:Session=Depends(get_session)):
    statement = select(Product).where(Product.id == productModel.id)
    
    product = session.exec(statement).first()
    product.price = productModel.price
    product.stock += productModel.stock
    
    session.add(product)
    session.commit()
    session.refresh(product)

    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Producto actualizado con exito"
    )

    