from fastapi import APIRouter, HTTPException
from models.user_model import UserModel
from database.connection import user_collection

router = APIRouter()

@router.post('/create-user') 
def create_user(user : UserModel) :
    if user_collection.find_one({"uid": user.uid}):
        raise HTTPException(status_code=400, detail="User already exists.")

    if user_collection.find_one({"username": user.username}) :
        raise HTTPException(status_code = 400, detail = "Username already exists.")
    
    user_data = {k: v for k, v in user.dict().items() if v is not None}
    user_collection.insert_one(user_data)
    return {'message': 'User created successfully'}

