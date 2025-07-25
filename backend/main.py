from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
from pinecone import ServerlessSpec
import time
from routes import check_dbconnection
from routes import create_user
from routes import get_data
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from database.pinecone import books_data, get_google_books
from routes import update_user
from routes import get_user
from routes import generate_description
import uvicorn
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000", 
        "https://orbital-project-sage.vercel.app"],
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
app.include_router(generate_description.router)

#to send the port for deployment
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000)) 
    uvicorn.run("main:app", host="0.0.0.0", port=port)

# print(recommendations3)
# print(recommendations2)
# print(recommendations3)