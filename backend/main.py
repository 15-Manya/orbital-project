from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
app = FastAPI()


# model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
# book_description = "Space opera novel about AI consciousness"
# embedding = model.encode(book_description)
# print(type(embedding))

def get_google_books(query, max_results=40):
    base_url = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": query,
        "maxResults": max_results,
        "key": "AIzaSyDqOV61F-dS3SLCO7CODBFLdbkP0sULfD0"
    }
    response = requests.get(base_url, params=params).json()
    return [item['volumeInfo'] for item in response.get('items', [])]

# Example: Get 200 programming books
books_data = get_google_books("programming")

print(books_data[0])
