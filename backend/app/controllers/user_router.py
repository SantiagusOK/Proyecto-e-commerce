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

from services.user_service import UserService

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
async def get_all_user(session:Session = Depends(get_session)):
    return UserService.get_all_user(session)
    
@router.get("/{id_user}",response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_a_user(id_user:int, session:Session = Depends(get_session)):
    return UserService.get_a_user(session, id_user)
    
@router.post("/registerUser",status_code=status.HTTP_201_CREATED)
async def register_user(anNewUser:UsersAddressSchema, session:Session = Depends(get_session)):
    return UserService.register_user(session, anNewUser)
        
@router.post("/logUser",response_model=UserResponse, status_code=status.HTTP_200_OK)
async def log_user(userLogin:UserLoginModelSchema, session:Session = Depends(get_session)):
    return UserService.log_user(session, userLogin)