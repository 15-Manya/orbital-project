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
from routes.generate_recommendations import recommendations


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(create_user.router)
app.include_router(check_dbconnection.router)
app.include_router(get_data.router)

print(recommendations)