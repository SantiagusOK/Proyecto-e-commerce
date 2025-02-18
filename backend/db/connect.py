from sqlmodel import SQLModel, Session, create_engine
from models.categories import Categories
from models.products import Products
from models.users import Users
from models.itemCarrito import ItemCarrito
from models.itemCompra import ItemCompra
from models.itemProductCompra import ItemProductCompra


database_file = "database.db"
database_connection_string = f"sqlite:///{database_file}"
connect_args = {"check_same_thread": False}
engine_url = create_engine(database_connection_string, echo=True,
connect_args=connect_args)

def conn():
    SQLModel.metadata.create_all(engine_url)

def get_session():
    with Session(engine_url) as session:
        yield session