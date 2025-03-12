from fastapi import APIRouter, Depends, status
from db.connect import get_session
from sqlmodel import Session
from schema.user_schema import UserLoginSchema
from schema.user_schema import UserResponse
from schema.user_schema import UserRegisterSchema
from services.user_service import UserService

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
async def get_all_user(session:Session = Depends(get_session)):
    return UserService.get_all_users(session)
    
@router.get("/{id_user}",response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_a_user(id_user:int, session:Session = Depends(get_session)):
    return UserService.get_a_user(session, id_user)
    
@router.post("/registerUser",status_code=status.HTTP_201_CREATED)
async def register_user(newUser:UserRegisterSchema,session:Session = Depends(get_session)):
    return UserService.register_user(session, newUser)

        
@router.post("/loginUser",response_model=UserResponse, status_code=status.HTTP_200_OK)
async def log_user(userLogin:UserLoginSchema, session:Session = Depends(get_session)):    
    return UserService.log_user(session, userLogin)

@router.put("/setRole/{id_user}/{id_role}")
async def set_role(id_user:int, id_role:int, session:Session = Depends(get_session)):
    return UserService.set_role(session, id_user, id_role)