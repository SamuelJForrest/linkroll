from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import ENGINE, SESSION_LOCAL
from sqlalchemy.orm import Session
import auth

app = FastAPI()
app.include_router(auth.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3000/*"
    ],
    allow_credentials=True,
    allow_methods=['GET', 'POST'],
    allow_headers=["*"]
)
models.BASE.metadata.create_all(bind=ENGINE)


def get_db():
    db = SESSION_LOCAL()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/api/")
async def index():
    return {"message": "Welcome to the homepage!"}
