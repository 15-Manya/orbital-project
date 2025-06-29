from models.user_model import UserModel
from database.connection import user_collection
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post('/update-user') 
def update_user(user : UserModel) : 
    if not user_collection.find_one({"uid": user.uid}):
        raise HTTPException(status_code=400, detail="User not found.")

    user_data = {k: v for k, v in user.dict().items() if v is not None and k not in ["uid", "email"]}
    user_collection.update_one({'uid': user.uid}, {"$set": user_data})
    return {'message': 'User created successfully'}

