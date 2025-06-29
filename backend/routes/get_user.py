from fastapi import APIRouter, HTTPException
from models.user_model import UserModel
from database.connection import user_collection

router = APIRouter()

@router.get('/get-user') 
def get_user(uid: str) :
    user = user_collection.find_one({'uid': uid})
    if not user :
        raise HTTPException(status_code=404, detail="User not found.");
    else :
        user['_id'] = str(user['_id'])
        return user

