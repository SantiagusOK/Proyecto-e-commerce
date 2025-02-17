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

router = APIRouter(prefix="/users", tags=["User"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    return session.exec(select(Users)).all()

@router.post("/registerUser")
async def create_categories(anNewUser:UsersModel, session:Session = Depends(get_session)):
    statement = select(Users).where(func.lower(Users.username) == anNewUser.username)
    userExist = session.exec(statement).first()
    
    if userExist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario ya esta en uso"
        ) 
    else:
        newUser = Users(**anNewUser.model_dump())
        session.add(newUser)
        session.commit()
        session.refresh(newUser)
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Usuario creado con exito"
        )

@router.post("/verifyLogin")
async def verify_login(userLogin:UsersLoginModel, session:Session = Depends(get_session)):
    statement = select(Users).where(
        func.lower(Users.username == userLogin.username.lower()))
    user = session.exec(statement).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="usuario no encontrado, o no existe"
        )
    
    if user.password != userLogin.password:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="contraseña incorrecta"
        )
    
    return {"status": "success", "user": user}
    
    
@router.get("/{id}")
async def get_a_user(id:int, session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == id)
    result = session.exec(statement).first()
    return result

@router.put("/setAdmin/{id}")
async def get_a_user(id:int, adminModel:UsersAdminModel ,session:Session = Depends(get_session)):
    statement = select(Users).where(Users.id == id)
    user = session.exec(statement).first()
    
    user.isAdmin = adminModel.isAdmin
    
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return user
