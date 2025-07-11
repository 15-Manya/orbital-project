from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
import time
from routes import check_dbconnection
from routes import create_user
from routes import get_data
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.generate_recommendations import recommendations3
from database.pinecone import books_data, get_google_books
from routes import update_user
from routes import get_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(create_user.router)
app.include_router(update_user.router)
app.include_router(get_user.router)
app.include_router(check_dbconnection.router)
app.include_router(chat_router)
app.include_router(get_data.router)

# print(recommendations3)
# print(recommendations2)
# print(recommendations3)