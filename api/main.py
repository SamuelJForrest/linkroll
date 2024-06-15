from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from models import (
    Users,
    Lists,
    Links,
)
from starlette import status
from database import ENGINE, SESSION_LOCAL
from sqlalchemy import func
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
    allow_methods=['GET', 'POST', 'DELETE', 'PUT'],
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


class Link(BaseModel):
    title: str
    url: str


class LinkList(BaseModel):
    user: int
    title: str
    data: List[Link]


@app.get("/api/")
async def index():
    return {"message": "Welcome to the homepage!"}


@app.get("/api/explore/")
async def explore(db: db_dependency):
    user_list = db.query(Users).all()

    return user_list


@app.get("/api/profile/{profile_id}")
async def profile(profile_id, db: db_dependency):
    user_profile = db.query(Users).filter(
        Users.id == profile_id
    ).first()

    user_lists = db.query(Lists).filter(
        Lists.user_id == profile_id
    ).all()

    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find that user. Please try again later."
        )

    context = {
        'user_profile': user_profile,
        'user_lists': user_lists
    }

    return context


@app.post("/api/new-list/")
async def new_list(data: LinkList, db: db_dependency):
    user = data.user
    title = data.title
    links = data.data

    existing_user = db.query(Users).filter(
        Users.id == user
    ).first()

    if existing_user:
        create_link_list = Lists(
            user_id=user,
            title=title
        )
        db.add(create_link_list)
        db.commit()

        list_id = create_link_list.id

        for link in links:
            if not link.url.startswith('http'):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid URL. Please Try again."
                )

            create_link = Links(
                title=link.title,
                url=link.url,
                list_id=list_id
            )
            db.add(create_link)

        db.commit()


@app.get("/api/list/{list_id}")
async def list(list_id, db: db_dependency):
    list = db.query(Lists).filter(
        Lists.id == list_id
    ).first()

    list_author = db.query(Users).filter(
        Users.id == list.user_id
    ).first()

    list_links = db.query(Links).filter(
        Links.list_id == list.id
    ).all()

    context = {
        'list': list,
        'list_author': list_author,
        'list_links': list_links
    }

    return context


@app.delete("/api/delete/{list_id}")
async def delete_list(list_id, db: db_dependency):
    list = db.query(Lists).filter(
        Lists.id == list_id
    ).first()

    if not list:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="List not found."
        )

    db.delete(list)
    db.commit()


@app.get("/api/search/{query}")
async def search(query: str, db: db_dependency):
    users = db.query(Users).filter(
        func.lower(Users.username).contains(query.lower())
    ).all()

    lists = db.query(Lists).filter(
        func.lower(Lists.title).contains(query.lower())
    ).all()

    context = {
        'users': users,
        'lists': lists
    }

    return context


@app.put("/api/edit/{list_id}")
async def edit_list(list_id: int, data: LinkList, db: db_dependency):
    # Fetch the list by ID
    existing_list = db.query(Lists).filter(Lists.id == list_id).first()

    if not existing_list:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="List not found."
        )

    # Update the title if provided
    if data.title is not None:
        existing_list.title = data.title

    # Update the links if provided
    if data.data is not None:
        # Delete existing links associated with the list
        db.query(Links).filter(Links.list_id == list_id).delete()

        # Add new links
        for link in data.data:
            if not link.url.startswith('http'):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid URL. Please try again."
                )

            new_link = Links(
                title=link.title,
                url=link.url,
                list_id=list_id
            )
            db.add(new_link)

    # Commit the changes
    db.commit()

    return {"message": "List updated successfully"}
