from fastapi import APIRouter, HTTPException
from models.home_model import HomeModel

router = APIRouter()

@router.post('/get_data')
def get_data(data : HomeModel): 
    return({'detail': 'data recieved'})