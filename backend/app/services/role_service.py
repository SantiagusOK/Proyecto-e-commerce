from fastapi import HTTPException, status
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from models.role import Role

class RoleService:
    @staticmethod
    def get_all_role(session:Session):
        roleStatement = (select(Role)
                    .options(selectinload(Role.users)))
        role = session.exec(roleStatement).all()

        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay roles registrados"
            )

        return role