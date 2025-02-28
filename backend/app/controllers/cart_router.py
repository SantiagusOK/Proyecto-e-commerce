from collections import defaultdict
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select

from models.product import Product
from models.category import Category
from models.user import User
from models.cart import Cart
from models.cart_state import CartState
from models.order import Order
from models.order_item import OrderItem
from models.order_state import OrderState

from schema.product_schema import *
from schema.category_schema import * 
from schema.user_schema import *
from schema.cart_schema import *
from schema.order_schema import *
from schema.orderItem_schema import *

from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

router = APIRouter(tags=["cart"], prefix="/cart")

@router.put("/setCarrito/{idUser}")
async def add_product_cart(idUser:int, anProduct:CartSchema, session:Session = Depends(get_session)):
    
    newCart = Cart(**anProduct.model_dump())
    
    productStatement = (select(Product)
                        .where(Product.id == anProduct.id))
    productResult = session.exec(productStatement).first()
    
#     stateStatement = select(CartState).where(CartState.name == "seleccionado")
#     anState = session.exec(stateStatement).first()
    
#     # newCart.product = productResult
#     newCart.state_id = anState.id
#     newCart.state = anState
    
    
#     session.add(newCart)
#     session.commit()
#     session.refresh(newCart)
    
#     statement = select(Product).where(Product.id == anProduct.id_product)
#     product = session.exec(statement).first()

#     product.stock -= anProduct.amount

#     if product.stock < 0:
#         product.stock = 0

#     session.add(product)
#     session.commit()
#     session.refresh(product)

#     raise HTTPException(
#     status_code=status.HTTP_200_OK,
#     detail="Producto agregado al carrito"
#     )

# def search_value(value:User ,session:Session):
#     result = session.exec(select(User)).all()
    
#     for user in result:
#         if user.username == value.username:
#             return value

# @router.get("/getCarrito/{idUser}")
# async def get_all_carrito(idUser:int, session:Session = Depends(get_session)):
#     statement = (select(User, Cart, State)
#                  .join(State, Cart.state_id == State.id)
#                  .join(Cart, Cart.id_user == User.id)
#                  .where(User.id == idUser).where(State.name == "seleccionado"))
#     cart = session.exec(statement).all()
#     if cart:
#         response = [
#             {
#                 "total":itemCarrito.total,
#                 "cantidad":itemCarrito.amount,
#                 "id_item_carrito":itemCarrito.id,
#                 "product":itemCarrito.product,
#                 "categorieProduct":itemCarrito.product.category
#             }
#             for Users, itemCarrito in cart
#         ]
        
#         return list(reversed(response))
#     else:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Carrito vacio"
#         )
    
# @router.get("/getItemCarrito/{idItem}/{idUser}")
# async def get_all_carrito(idItem:int, idUser:int, session:Session = Depends(get_session)):
#     statement = (select(Cart, Product)
#                  .join(Product, Product.id == Cart.id_product)
#                  .where(Cart.id == idItem)
#                  .where(Cart.id_user == idUser))
#     itemCart = session.exec(statement).first() 
    
#     itemCarrito, product = itemCart 

#     response = {
#         "product": product.name,
#         "product_price":product.price,
#         "cantidad":itemCarrito.amount,
#         "total":itemCarrito.total,
#         "id_item_carrito":itemCarrito.id,
#         "stock_product":product.stock
#     }
#     return response

# @router.put("/modifyAnItemCart/{idItem}")
# async def get_all_carrito(idItem:int,itemCartUpdate:CartUpdate ,session:Session = Depends(get_session)):
    
#     statement = select(Cart).where(Cart.id == idItem)
#     itemCart = session.exec(statement).first()
    
#     itemCart.total = itemCartUpdate.total
#     itemCart.amount = itemCartUpdate.amount
    
#     statementNew = select(Product).where(Product.id == itemCart.id_product)
#     product = session.exec(statementNew).first()
#     product.stock = itemCartUpdate.stockProduct
    
#     session.add_all([product, itemCart])
#     session.commit()
#     session.refresh(product)
#     session.refresh(itemCart)
    
#     raise HTTPException(
#         status_code=status.HTTP_200_OK,
#         detail="item del carrito editado con exito"
#     )
            
# @router.put("/deleteAnItemCart/{idItem}")
# async def delete_a_item_from_cart(idItem:int, session:Session = Depends(get_session)):

#     statement = (select(Cart)
#                  .where(Cart.id == idItem))
#     itemCart = session.exec(statement).first()
    
#     # itemCart.eliminado = True cambiar el estado a eliminado

#     statementNew = select(Product).where(Product.id == itemCart.id_product)
#     product = session.exec(statementNew).first()

#     product.stock += itemCart.amount  
      
#     session.add_all([product, itemCart])
#     session.commit()
#     session.refresh(product)
#     session.refresh(itemCart)
    
#     raise HTTPException(
#         status_code=status.HTTP_200_OK,
#         detail="Item de carrito eliminado"
#     )
# @router.put("/realizeABuy/{idUser}")
# async def realize_a_buy(idUser:int, comprasModel:OrderModel, session:Session = Depends(get_session)):
    
#     newCompraItem = Order(**comprasModel.model_dump())
    
#     session.add(newCompraItem)
#     session.commit()
#     session.refresh(newCompraItem)
    
#     statementCarrito = select(Cart).where(Cart.id_user == idUser, Cart.eliminado == False) ## cart.State.name == "eliminado"
    
#     itemCart = session.exec(statementCarrito).all()
    
#     for item in itemCart:
#         newProductCompra = OrderItem(
#             id_compra=newCompraItem.id,
#             id_product=item.id_product,
#             total_por_cantidad=item.total,
#             cantidad=item.amount
#             )
        
#         item.eliminado = True ## cambiar el estado a "eliminado"
        
#         newCompraItem.orders.nd(newProductCompra)
        
#         session.add(newCompraItem)
#         session.add(item)
#         session.commit()
#         session.refresh(newCompraItem)
    
#     raise HTTPException(
#         status_code=status.HTTP_202_ACCEPTED,
#         detail="Compra realizada"
#     )
     
# @router.get("/getAllBuy/{idUser}")
# async def get_buy(idUser:int, session:Session = Depends(get_session)):
    
#     statement = (select(Order)
#                  .where(Order.id_user == idUser))
    
#     result = session.exec(statement).all()

    
#     response =[
#         {
#             "fechaCompra": itemCompra.date,
#             "totalCompra" : itemCompra.totalOrder,
#             "productos" : itemCompra.orders,
            
#         }
#         for itemCompra in result
#     ]
    
#     return list(reversed(response))

# async def clear_all_carrito(idUser:int, session:Session):
#     statement = (select(Cart).where(Cart.id_user == idUser))
#     itemCart = session.exec(statement).all()
#     for item in itemCart:
#         item.eliminado = True # cambiar el estado a "eliminado"
#         session.add(item)
#         session.commit()
#         session.refresh(item)
        
        
    
