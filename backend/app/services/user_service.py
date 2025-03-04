from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload

from schema.user_address_schema import UsersAddressSchema, UserLoginModelSchema

from models.user import User
from models.address import Address
from models.role import Role

from schema.user_response import UserResponse

class UserService:
    @staticmethod
    
    def get_all_user(session:Session):
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
    
    def register_user(session:Session, anNewUser:UsersAddressSchema):
        statement = (select(User)
                    .where(func.lower(User.username) == anNewUser.user.username.lowe()))
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
        
        newUser.role_id = roleResult.id
        newUser.role = roleResult
        
        session.add_all([newUser, newAddress])
        session.commit()
        session.refresh(newUser)
        session.refresh(newAddress)
        
        return {"message" : "Usuario creado con exito"}
    
    def log_user(session:Session, userLogin:UserLoginModelSchema):
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
            
        # return JSONResponse(
        #     status_code=status.HTTP_200_OK,
        #     content={"user":{
        #         "id":user.id,
        #         "username":user.username,
        #         "fullname":user.fullname,
        #         "lastname":user.lastname,
        #         "adress":{
        #             "city":user.address.city,
        #             "state":user.address.state,
        #             "postal_code":user.address.postal_code,
        #             "street":user.address.street,
        #             "country":user.address.country
        #         }
        #     }}
        # )
        
        return user