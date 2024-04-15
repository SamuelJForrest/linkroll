from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from models import Users
from starlette import status
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


@app.get("/api/profile/{profile_id}")
async def profile(profile_id, db: db_dependency):
    user_profile = db.query(Users).filter(
        Users.id == profile_id
    ).first()

    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find that user. Please try again later."
        )

    return user_profile
