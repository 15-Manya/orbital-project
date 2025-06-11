from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
app = FastAPI()

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


def create_book_description(book):
    return f"""
    {book.get('title', 'Untitled')} by {', '.join(book.get('authors', ['Unknown']))}.
    Published: {book.get('publishedDate', 'N/A')}.
    {book.get('description', 'No description available')}
    Genres: {', '.join(book.get('categories', ['General']))}.
    {book.get('pageCount', '')} pages. 
    Average Rating: {book.get('averageRating', 'Unrated')}/5.
    """

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
descriptions = [create_book_description(b) for b in books_data]
embeddings = model.encode(descriptions).tolist()  # Converts to 384D vectors


print(len(embeddings))