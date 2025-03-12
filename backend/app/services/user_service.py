from fastapi import HTTPException, status
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload
from schema.user_schema import UserRegisterSchema, UserLoginSchema
from models.user import User
from models.address import Address
from models.role import Role

class UserService:
    @staticmethod
    def set_role(session:Session, id_user:int, id_role:int):
        userStatement = (select(User).where(User.id == id_user))
        user = session.exec(userStatement).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el usuario, o no existe"
            )
        
        roleStatement = (select(Role).where(Role.id == id_role))
        role = session.exec(roleStatement).first()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el rol, o no existe"
            )
        
        user.role = role
        user.role_id = role.id
        
        session.add(user)
        session.commit()
        
        return {"message" : "Rol del usuario actualizado con exito"}
    
    @staticmethod
    def get_all_users(session:Session):
        userStatement = (select(User)
                         .options(selectinload(User.role),
                                  selectinload(User.address),
                                  selectinload(User.orderStateHistory)))
        user = session.exec(userStatement).all()

        if not user:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay usuarios registrados todavia "
        )
            
        return user
    
    @staticmethod
    def get_a_user(session:Session, id_user:int):
        statement = (select(User)
                    .options(selectinload(User.role),
                                selectinload(User.address),
                                selectinload(User.orderStateHistory))
                    .where(User.id == id_user))
        user = session.exec(statement).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrando"
            )
        
        return user
    
    @staticmethod
    def register_user(session:Session, anNewUser:UserRegisterSchema):
        statement = (select(User)
                    .where(func.lower(User.username) == anNewUser.user.username.lower()))
        userExist = session.exec(statement).first()
        
        if userExist:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Nombre de usuario ya esta en uso"
            ) 
        
        
        newAddress = Address(**anNewUser.address.model_dump())
        newUser = User(**anNewUser.user.model_dump())
        
        newUser.address = newAddress
        
        roleStatement = (select(Role)
                            .where(Role.roleName == "cliente"))
        roleResult = session.exec(roleStatement).first()
        
        if not roleResult:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro un rol"
            ) 
        
        newUser.role_id = roleResult.id
        newUser.role = roleResult
        
        
        
        
        session.add_all([newUser, newAddress])
        session.commit()
        session.refresh(newUser)
        session.refresh(newAddress)
        
        return {"message" : "Usuario creado con exito"}
    
    @staticmethod
    def log_user(session:Session, userLogin:UserLoginSchema):
        statement = (select(User)
                    .options(selectinload(User.role),
                            selectinload(User.address))
                    .where(func.lower(User.username) == userLogin.username.lower()))
        user = session.exec(statement).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="usuario no encontrado, o no existe"
            )
        
        if user.password != userLogin.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="contraseña incorrecta"
            )
        
        return user