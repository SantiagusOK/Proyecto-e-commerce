from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import selectinload


from db.connect import get_session
from sqlmodel import Session, select

from models.user import User
from models.address import Address
from models.role import Role

from schema.user_schema import *
from schema.user_response import *
from schema.user_address_schema import * 

from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    result = session.exec(select(User)).all()
    
    if result:
        return result
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="No hay usuarios registrados todavia "
    )

@router.post("/registerUser")
async def register_user(anNewUser:UsersAddressSchema, session:Session = Depends(get_session)):
    statement = (select(User)
                 .where(func.lower(User.username) == anNewUser.user.username.lower()))
    userExist = session.exec(statement).first()
    
    if userExist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario ya esta en uso"
        ) 
    else:
        
        newAddress = Address(**anNewUser.address.model_dump())
        newUser = User(**anNewUser.user.model_dump())
        
        newUser.address = newAddress
        
        roleStatement = (select(Role)
                         .where(Role.roleName == "cliente"))
        roleResult = session.exec(roleStatement).first()
        
        newUser.role_id = roleResult.id
        newUser.role = roleResult
        
        session.add_all([newUser, newAddress])
        session.commit()
        session.refresh(newUser)
        session.refresh(newAddress)
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Usuario creado con exito"
        )
        
@router.get("/{id}")
async def get_a_user(id:int, session:Session = Depends(get_session)):
    statement = (select(User)
                 .options(selectinload(User.address))
                 .where(User.id == id))
    user = session.exec(statement).first()
    
    if user:
        user_response = {
            "id":user.id,
            "fullname":user.fullname,
            "lastname":user.lastname,
            "username":user.username,
            "password":user.password,
            "email":user.email,
            "birthdate":user.birthdate,
            "role_id":user.role_id,
            "role":user.role,
            "address":user.address
        }
        return user_response
    
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hubo un error al mostrar este usuario"
        )

@router.post("/verifyLogin")
async def verify_login(userLogin:UserLoginModelSchema, session:Session = Depends(get_session)):
    
    statement = (select(User).where(
        func.lower(User.username) == userLogin.username.lower()))
    
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
    
    return user
    
    
