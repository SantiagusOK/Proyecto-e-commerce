from fastapi import FastAPI
from controllers import cart_router, category_router, product_router, user_router, role_router, order_router
from db.connect import conn

from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

app.include_router(product_router.router)
app.include_router(category_router.router)
app.include_router(user_router.router)
app.include_router(cart_router.router)
app.include_router(role_router.router)
app.include_router(order_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Aquí defines los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.get("/")
async def get():
    return{"hello" : "world"}

@app.on_event("startup")
async def onStartUp():
    conn()
    
if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000)