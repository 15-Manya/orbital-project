from fastapi import APIRouter, HTTPException
from models.user_model import UserModel
from database.connection import user_collection

router = APIRouter()

@router.post('/create-user') 
def create_user(user : UserModel) :
    if user_collection.find_one({"username": user.username}) :
        raise HTTPException(status_code = 400, detail = "Username already exists")
    
    user_collection.insert_one(user.dict())
    return {'message': 'User created successfully'}
