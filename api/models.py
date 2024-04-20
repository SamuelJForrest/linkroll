from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    ARRAY
)
from database import BASE


class Users(BASE):
    __tablename__ = 'users'

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True
    )

    hashed_password = Column(
        String
    )


class Lists(BASE):
    __tablename__ = 'lists'

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey('users.id')
    )

    title = Column(
        String
    )


class Links(BASE):
    __tablename__ = 'links'

    id = Column(
        Integer,
        primary_key=True
    )

    title = Column(
        String
    )

    url = Column(
        String
    )

    list_id = Column(
        Integer,
        ForeignKey('lists.id')
    )
