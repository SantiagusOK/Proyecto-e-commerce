from fastapi import APIRouter, Depends, HTTPException, status
from db.connect import get_session
from sqlmodel import Session, select

from models.role import Role
from models.user import User

from schema.setRole_schema import SetRoleSchema

router = APIRouter(tags=["Role"], prefix="/role")

@router.get("/")
async def get_all_role(session:Session = Depends(get_session)):
    roleStatement = (select(Role))
    result = session.exec(roleStatement).all()
    
    if result:
        return result
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="No hay roles registrados"
    )

@router.put("/setRole/{id}")
async def set_role(id:int, setRole:SetRoleSchema, session:Session = Depends(get_session)):
    roleStatement = (select(Role)
                     .where(Role.id == setRole.id_role))
    UserStatement = (select(User)
                     .where(User.id == id))
    
    roleResult = session.exec(roleStatement).first()
    userResult = session.exec(UserStatement).first()
    
    if not roleResult and not userResult:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Hubo un error al intentar actulizar el rol"
        )
    
    userResult.role_id = roleResult.id
    userResult.role = roleResult
    
    session.add(userResult)
    session.commit()
    session.refresh(userResult)
    
    raise HTTPException(
            status_code=status.HTTP_202_ACCEPTED,
            detail="Rol del usuario actulizado"
        )
    
    