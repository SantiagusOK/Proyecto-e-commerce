from fastapi import APIRouter, HTTPException, status, Depends
from db.connect import get_session
from sqlmodel import Session, select
from models.products import ProductModel, Products
from models.categories import CategorieModel, Categories
from models.users import Users, UsersModel
from models.itemCarrito import ItemCarritoModel
from models.itemCompra import ItemCompraModel, ItemCompras
from sqlalchemy.orm.attributes import flag_modified

router = APIRouter(prefix="/users", tags=["User"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    return session.exec(select(Users)).all()

@router.post("/create")
async def create_categories(anNewUser:UsersModel, session:Session = Depends(get_session)):
    user = Users(**anNewUser.model_dump())
    
    if type(search_value(user, session)) != Users:
        newUser = Users(**user.model_dump())
        session.add(newUser)
        session.commit()
        session.refresh(newUser)
        return newUser
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Este usuario ya esta registrado"
        )
    
@router.put("/setCarrito")
async def add_product_cart(anProduct:ItemCarritoModel, session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == 1)
    userBD = session.exec(statement).one()
    anProduct.id = len(userBD.carrito_items)+1
    product = anProduct.model_dump()
    userBD.carrito_items.append(product)
    
    flag_modified(userBD, "carrito_items")
    
    session.add(userBD)
    session.commit()
    session.refresh(userBD)
    
    return userBD
    
def search_value(value:Users ,session:Session):
    result = session.exec(select(Users)).all()
    
    for user in result:
        if user.username == value.username:
            return value

@router.get("/getCarrito")
async def get_all_carrito(session:Session = Depends(get_session)):
    statement = select(Users)
    result = session.exec(statement).one() ##CAMBIAR ESTO MAS ADELANTE
    return result.carrito_items


@router.get("/getItemCarrito/{id}")
async def get_all_carrito(id:int, session:Session = Depends(get_session)):
    statement = select(Users)
    user = session.exec(statement).one() ##CAMBIAR ESTO MAS ADELANTE
    for itemCarrito in user.carrito_items:
        if itemCarrito["id"] == id:
            return itemCarrito


@router.put("/modifyAnItemCart/{id}")
async def get_all_carrito(id:int,itemCart:ItemCarritoModel ,session:Session = Depends(get_session)):
    statement = select(Users)
    userBD = session.exec(statement).one() ##CAMBIAR ESTO MAS ADELANTE
    for itemCarrito in userBD.carrito_items:
        if itemCarrito["id"] == id:
            itemCarrito["total"] = itemCart.total
            itemCarrito["amount"] = itemCart.amount
            # return itemCarrito
            flag_modified(userBD, "carrito_items")
            
            session.add(userBD)
            session.commit()
            session.refresh(userBD)
            
            return userBD


@router.put("/deleteAnItemCart/{id}")
async def get_all_carrito(id:int, session:Session = Depends(get_session)):
    statement = select(Users)
    userBD = session.exec(statement).one() ##CAMBIAR ESTO MAS ADELANTE
    index = 0
    for itemCarrito in userBD.carrito_items:
        if itemCarrito["id"] == id:
            del userBD.carrito_items[index]
            
            flag_modified(userBD, "carrito_items")
            
            session.add(userBD)
            session.commit()
            session.refresh(userBD)
            
            return userBD
            
        index += 1 


@router.put("/realizeABuy/{idUser}")
async def realize_a_buy(idUser:int, comprasModel:ItemCompraModel, session:Session = Depends(get_session)):
    
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
        status_code=status.HTTP_201_CREATED,
        detail="COMPRA REALIZADA"
    )
    
@router.get("/getCart/{idUser}")
async def get_Cart(idUser:int, session:Session = Depends(get_session)):
    
    userBD = session.get(Users, idUser)
    
    return userBD.compras_lista
    
    
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="COMPRA REALIZADA"
    )
            
    

    
    