from fastapi import APIRouter, HTTPException
from models.home_model import HomeModel
from routes.generate_recommendations import get_recommendation
from database.connection import user_collection

router = APIRouter()

@router.post('/get_data')
def get_data(data : HomeModel): 
    username = data.username
    info = user_collection.find_one({'username': 'Shamit'}, {'_id': 0})
    books = info['favBooks'] #list of the user's favourite books
    # recommendations = [get_recommendation(book) for book in books]
    recommendations = []
    for book in books: 
        recommendations = recommendations + get_recommendation(book) #recommendations is a list of tuples
    
    

    # information = str(type(info))
    return({'detail': 'data recieved', 'username': username, 'recommendations' : recommendations})