from sqlmodel import SQLModel, Session, create_engine
from models.role import Role
from models.category import Category
from models.product import Product
from models.user import User
from models.cart import Cart
from models.order import Order
from models.orderItem import OrderItem
from models.state import State
from models.PriceChangeHistory import PriceChangeHistory



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