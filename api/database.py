import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

URL_DATABASE = os.environ.get('DATABASE_URL')

ENGINE = create_engine(
    URL_DATABASE
)

SESSION_LOCAL = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=ENGINE
)

BASE = declarative_base()
