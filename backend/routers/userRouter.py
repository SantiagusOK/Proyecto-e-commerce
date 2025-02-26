from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.user import User, UserModel, UserLoginModel, UserAdminModel
from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse
router = APIRouter(prefix="/users", tags=["User"])

@router.get("/")
async def get_all_categories(session:Session = Depends(get_session)):
    return session.exec(select(User)).all()

@router.post("/registerUser")
async def create_categories(anNewUser:UserModel, session:Session = Depends(get_session)):
    statement = select(User).where(func.lower(User.username) == anNewUser.username)
    userExist = session.exec(statement).first()
    
    if userExist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario ya esta en uso"
        ) 
    else:
        newUser = User(**anNewUser.model_dump())
        session.add(newUser)
        session.commit()
        session.refresh(newUser)
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Usuario creado con exito"
        )

@router.post("/verifyLogin")
async def verify_login(userLogin:UserLoginModel, session:Session = Depends(get_session)):
    
    statement = select(User).where(
        func.lower(User.username) == userLogin.username.lower())
    
    user = session.exec(statement).first()
    
    print("hola-----------------------2")
    
    
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
    statement = select(User).where(User.id == id)
    result = session.exec(statement).first()
    return result

@router.put("/setAdmin/{id}")
async def get_a_user(id:int, adminModel:UserAdminModel ,session:Session = Depends(get_session)):
    statement = select(User).where(User.id == id)
    user = session.exec(statement).first()
    
    user.isAdmin = adminModel.isAdmin
    
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return user
