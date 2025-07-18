from fastapi import APIRouter, HTTPException
from models.home_model import HomeModel
from models.search_model import Search
from routes.generate_recommendations import get_recommendation, get_general_recommendation
from database.connection import user_collection

router = APIRouter()

@router.post('/get_data')
def get_data(data : HomeModel): 
    username = data.username
    info = user_collection.find_one({'username': username}, {'_id': 0})
    books_fav = info['favBooks'] #list of the user's favourite books
    books_read = info['readBooks'] #list of the user's read books
    total_books = books_read
    books = total_books[-3:]
    set_1 = get_recommendation(books[0])
    set_2 = get_recommendation(books[1])
    set_3 = get_recommendation(books[2])
    general = get_general_recommendation(books[0],books[1],books[2])
    
    

    # information = str(type(info))
    return({'detail': 'data recieved', 'username': username, 'set1': set_1, 'set2': set_2, 'set3': set_3, 'general': general, 'all books': total_books, 'books':books})


@router.post('/search_data')
def search_data(data : Search): 
    book_name = data.book
    recos = get_recommendation(book_name,15)
    return ({'detail': 'data recieved my man', 'recommendations': recos})