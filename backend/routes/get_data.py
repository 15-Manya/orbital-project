from fastapi import APIRouter, HTTPException
from models.home_model import HomeModel
from routes.generate_recommendations import get_recommendation
from database.connection import user_collection

router = APIRouter()

@router.post('/get_data')
def get_data(data : HomeModel): 
    username = data.username
    info = user_collection.find_one({'username': 'Shamit'}, {'_id': 0})
    return({'detail': 'data recieved', 'username': username, 'info' : info})