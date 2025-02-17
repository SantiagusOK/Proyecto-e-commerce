from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products
from models.categories import CategorieModel, Categories
from models.users import Users, UsersModel, UsersLoginModel, UsersAdminModel
from models.itemCarrito import ItemCarritoModel
from models.itemCompra import ItemCompraModel, ItemCompras
from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Carrito"], prefix="/carrito")

@router.put("/setCarrito/{idUser}")
async def add_product_cart(idUser:int, anProduct:ItemCarritoModel, session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == idUser)
    userBD = session.exec(statement).first()
    anProduct.id = len(userBD.carrito_items)+1
    product = anProduct.model_dump()
    userBD.carrito_items.append(product)
    
    flag_modified(userBD, "carrito_items")
    
    session.add(userBD)
    session.commit()
    session.refresh(userBD)
    
    statement = select(Products).where(Products.id == anProduct.id_product)
    product = session.exec(statement).first()
    
    product.stock -= anProduct.amount
    
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
    statement = select(Users).where(Users.id == idUser)
    user = session.exec(statement).first() 
    return user.carrito_items


@router.get("/getItemCarrito/{idItem}/{idUser}")
async def get_all_carrito(idItem:int, idUser:int, session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == idUser)
    user = session.exec(statement).first() 
    for itemCarrito in user.carrito_items:
        if itemCarrito["id"] == idItem:
            return itemCarrito

## arreglar esto mas adelante
@router.put("/modifyAnItemCart/{id}/{idUser}/{stockP}")
async def get_all_carrito(id:int, idUser:int, stockP:int,itemCart:ItemCarritoModel ,session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == idUser)
    userBD = session.exec(statement).first() #
    for itemCarrito in userBD.carrito_items:
        if itemCarrito["id"] == id:
            itemCarrito["total"] = itemCart.total
            itemCarrito["amount"] = itemCart.amount
            
            flag_modified(userBD, "carrito_items")
        
            session.add(userBD)
            session.commit()
            session.refresh(userBD)
            
            productSelect = ItemCarritoModel(**itemCarrito)
                
            statementNew = select(Products).where(Products.id == productSelect.id_product)
            product = session.exec(statementNew).first()
            product.stock = stockP
            
            session.add(product)
            session.commit()
            session.refresh(product)
            
            raise HTTPException(
                status_code=status.HTTP_200_OK,
                detail="item del carrito editado con exito"
            )
            
            

@router.put("/deleteAnItemCart/{idItem}/{idUser}")
async def delete_a_item_from_cart(idItem:int, idUser:int, session:Session = Depends(get_session)):

    statement = select(Users).where(Users.id==idUser)
    userBD = session.exec(statement).first()

    index = 0
    for itemCarrito in userBD.carrito_items:
        if itemCarrito["id"] == idItem:
            del userBD.carrito_items[index]
            flag_modified(userBD, "carrito_items")
            session.add(userBD)
            session.commit()
            session.refresh(userBD)
            
            productSelect = ItemCarritoModel(**itemCarrito)
                
            statementNew = select(Products).where(Products.id == productSelect.id_product)
            product = session.exec(statementNew).first()
        
            product.stock += productSelect.amount    
            session.add(product)
            session.commit()
            session.refresh(product)
            
        index += 1 

@router.put("/realizeABuy/{idUser}")
async def realize_a_buy(idUser:int, comprasModel:ItemCompraModel, session:Session = Depends(get_session)):
    print(comprasModel)
    userBD = session.get(Users, idUser)
    
    newCompra = ItemCompras(**comprasModel.model_dump()) 
    session.add(newCompra)
    session.commit()
    session.refresh(newCompra)

    userBD.compras_lista.append(newCompra.model_dump())
    userBD.carrito_items = []

    flag_modified(userBD, "compras_lista")
    print(userBD)

    session.add(userBD)
    session.commit()
    session.refresh(userBD)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Compra realizada"
    )
 
@router.get("/getAllBuy/{idUser}")
async def get_buy(idUser:int, session:Session = Depends(get_session)):
    userBD = session.get(Users, idUser)
    return userBD.compras_lista
