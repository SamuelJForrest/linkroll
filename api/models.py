from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String
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
