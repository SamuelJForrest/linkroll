from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import ENGINE, SESSION_LOCAL
from sqlalchemy.orm import Session
import auth

app = FastAPI()
app.include_router(auth.router)
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
