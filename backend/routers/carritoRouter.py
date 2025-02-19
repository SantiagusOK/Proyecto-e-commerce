from collections import defaultdict
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products
from models.categories import CategorieModel, Categories
from models.users import Users, UsersModel, UsersLoginModel, UsersAdminModel
from models.itemCarrito import ItemCarritoModel, ItemCarrito, ItemCarritoUpdate
from models.itemCompra import ItemCompraModel, ItemCompra
from models.itemProductCompra import ItemProductCompra, ItemProductCompraModel
from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Carrito"], prefix="/carrito")

@router.put("/setCarrito/{idUser}")
async def add_product_cart(idUser:int, anProduct:ItemCarritoModel, session:Session = Depends(get_session)):

    newItemCarrito = ItemCarrito(**anProduct.model_dump())
    
    session.add(newItemCarrito)
    session.commit()
    session.refresh(newItemCarrito)
    
    statement = select(Products).where(Products.idProduct == anProduct.id_product)
    product = session.exec(statement).first()

    product.stock -= anProduct.cantidad

    if product.stock < 0:product.stock = 0

    session.add(product)
    session.commit()
    session.refresh(product)

    raise HTTPException(
    status_code=status.HTTP_200_OK,
    detail="Producto agregado al carrito"
    )

def search_value(value:Users ,session:Session):
    result = session.exec(select(Users)).all()
    
    for user in result:
        if user.username == value.username:
            return value

@router.get("/getCarrito/{idUser}")
async def get_all_carrito(idUser:int, session:Session = Depends(get_session)):
    statement = (select(Users, ItemCarrito, Products)
                 .join(ItemCarrito, ItemCarrito.id_usuario == Users.idUser)
                 .join(Products, Products.idProduct == ItemCarrito.id_product)
                 .where(Users.idUser == idUser).where(ItemCarrito.eliminado == False)
                 )
    cart = session.exec(statement).all()
    if cart:
        response = [
            {
                "total":itemCarrito.total,
                "cantidad":itemCarrito.cantidad,
                "product":products.name,
                "priceProduct":products.price,
                "id_item_carrito":itemCarrito.id_item_carrito
            }
            for Users, itemCarrito, products in cart
        ]
        
        return response
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito vacio"
        )
    


@router.get("/getItemCarrito/{idItem}/{idUser}")
async def get_all_carrito(idItem:int, idUser:int, session:Session = Depends(get_session)):
    statement = (select(ItemCarrito, Products)
                 .join(Products, Products.idProduct == ItemCarrito.id_product)
                 .where(ItemCarrito.id_item_carrito == idItem)
                 .where(ItemCarrito.id_usuario == idUser))
    itemCart = session.exec(statement).first() 
    
    itemCarrito, product = itemCart 

    response = {
        "product": product.name,
        "product_price":product.price,
        "cantidad":itemCarrito.cantidad,
        "total":itemCarrito.total,
        "id_item_carrito":itemCarrito.id_item_carrito,
        "stock_product":product.stock
    }
    return response
    # for itemCarrito in user.carrito_items:
    #     if itemCarrito["id"] == idItem:
    #         return itemCarrito

## arreglar esto mas adelante
@router.put("/modifyAnItemCart/{idItem}")
async def get_all_carrito(idItem:int,itemCartUpdate:ItemCarritoUpdate ,session:Session = Depends(get_session)):
    
    statement = select(ItemCarrito).where(ItemCarrito.id_item_carrito == idItem)
    itemCart = session.exec(statement).first()
    
    itemCart.total = itemCartUpdate.total
    itemCart.cantidad = itemCartUpdate.cantidad
    
    statementNew = select(Products).where(Products.idProduct == itemCart.id_product)
    product = session.exec(statementNew).first()
    product.stock = itemCartUpdate.stockProduct
    
    session.add_all([product, itemCart])
    session.commit()
    session.refresh(product)
    session.refresh(itemCart)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="item del carrito editado con exito"
    )
            

@router.put("/deleteAnItemCart/{idItem}/{idUser}")
async def delete_a_item_from_cart(idItem:int, idUser:int, session:Session = Depends(get_session)):

    statement = (select(ItemCarrito)
                 .where(ItemCarrito.id_usuario == idUser)
                 .where(ItemCarrito.id_item_carrito == idItem))
    itemCart = session.exec(statement).first()
    
    itemCart.eliminado = True

    statementNew = select(Products).where(Products.idProduct == itemCart.id_product)
    product = session.exec(statementNew).first()

    product.stock += itemCart.cantidad  
      
    session.add_all([product, itemCart])
    session.commit()
    session.refresh(product)
    session.refresh(itemCart)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Item de carrito eliminado"
    )
@router.put("/realizeABuy/{idUser}")
async def realize_a_buy(idUser:int, comprasModel:ItemCompraModel, session:Session = Depends(get_session)):
    
    newCompraItem = ItemCompra(**comprasModel.model_dump())
    
    session.add(newCompraItem)
    session.commit()
    session.refresh(newCompraItem)
    
    statement = (select(Users, ItemCarrito, Products)
                 .join(ItemCarrito, ItemCarrito.id_usuario == Users.idUser)
                 .join(Products, Products.idProduct == ItemCarrito.id_product)
                 .where(Users.idUser == idUser).where(ItemCarrito.eliminado == False)
                 )
    cart = session.exec(statement).all()
    if cart:
        response = [
            {
                "total_por_cantidad":itemCarrito.total,
                "cantidad":itemCarrito.cantidad,
                "id_product":products.idProduct
            }
            for Users, itemCarrito, products in cart
        ]
        
        for itemProducts in response:
            newProductCompra = ItemProductCompra(**itemProducts)
            newProductCompra.id_compra = newCompraItem.idCompra
            
            session.add(newProductCompra)
            session.commit()
            session.refresh(newProductCompra) 
            
        await clear_all_carrito(idUser,session)
        
        
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito vacio"
        )
    
    
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Compra realizada"
    )
 
@router.get("/getAllBuy/{idUser}")
async def get_buy(idUser:int, session:Session = Depends(get_session)):
    
    statement = (select(ItemCompra)
                    .where(ItemCompra.id_user == idUser))
    compras = session.exec(statement).all()
    
    response = [
        {
            "fechaCompra": itemCompra.fechaDeCompra,  
            "id_compra":itemCompra.idCompra,
            "totalCompra":itemCompra.totalCompra
        }
        for itemCompra in compras
    ]
      
    for itemC in response: 
        statement2 = (select(ItemCompra, ItemProductCompra, Products, Categories)
                    .join(ItemProductCompra, ItemCompra.idCompra == ItemProductCompra.id_compra)
                    .join(Categories,Products.categories == Categories.id )
                    .join(Products, ItemProductCompra.id_product == Products.idProduct)
                    .where(ItemCompra.id_user == idUser)
                    .where(ItemCompra.idCompra == itemC["id_compra"]))
        productos = session.exec(statement2).all()    
        productDict = [
            {   
                "name":products.name,
                "cantidad":itemProductCompra.cantidad,
                "totalCantidad":itemProductCompra.total_por_cantidad,
                "categoria":categories.name
            }
            for itemCompra, itemProductCompra, products, categories in productos
        ]
        
        itemC["productos"] = productDict
        
    return response
    


async def clear_all_carrito(idUser:int, session:Session):
    statement = (select(ItemCarrito).where(ItemCarrito.id_usuario == idUser))
    itemCart = session.exec(statement).all()
    for item in itemCart:
        item.eliminado = True
        session.add(item)
        session.commit()
        session.refresh(item)
        
        
    
