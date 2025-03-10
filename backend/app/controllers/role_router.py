from fastapi import APIRouter, Depends, status
from db.connect import get_session
from sqlmodel import Session
from schema.role_schema import RoleResponse
from services.role_service import RoleService

router = APIRouter(tags=["Role"], prefix="/role")

@router.get("/",response_model=list[RoleResponse], status_code=status.HTTP_200_OK)
async def get_all_role(session:Session = Depends(get_session)):
    return RoleService.get_all_role(session)
    