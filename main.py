from fastapi import FastAPI
from db.connect import conn
from routers import productRouter, categorieRouter, userRouter
from fastapi.middleware.cors import CORSMiddleware


import uvicorn

app = FastAPI()

app.include_router(productRouter.router)
app.include_router(categorieRouter.router)
app.include_router(userRouter.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Permitir tu frontend local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

@app.get("/")
async def get():
    return{"hello" : "world"}

@app.on_event("startup")
async def onStartUp():
    conn()
    
if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, reload=True)