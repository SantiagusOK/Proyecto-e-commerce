from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, func, select

from db.connect import get_session

from models.role import CreateRoleModel, Role

router = APIRouter(prefix="/role", tags=["Role"])

@router.get("/")
async def get_all_role(session:Session = Depends(get_session)):
    roles = session.exec(select(Role)).all()
    return roles

@router.post("/create")
async def create_role(roleModel:CreateRoleModel ,session:Session = Depends(get_session)):
    print(roleModel.roleName)
    statement = select(Role).where(func.lower(Role.roleName) == roleModel.roleName.lower())
    roleResult = session.exec(statement).first()
    
    if roleResult:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Este Rol ya esta registrado"
        )
    
    newRole = Role(**roleModel.model_dump())
    session.add(newRole)
    session.commit()
    
    raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Rol registrado con exito"
        )
    