from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
import time
from routes import check_dbconnection
from routes import create_user


app = FastAPI()
app.include_router(create_user.router)
app.include_router(check_dbconnection.router)

def get_google_books(query, max_results=40):
    base_url = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": query,
        "maxResults": max_results,
        "key": "AIzaSyDqOV61F-dS3SLCO7CODBFLdbkP0sULfD0"
    }
    response = requests.get(base_url, params=params).json()
    return [item['volumeInfo'] for item in response.get('items', [])]


#Get 40 books of each genre
genres = ["programming","history", "sci-fi", "romantic","thriller","fantasy","fiction","self-help"]

def get_book_data(genre_list): 
    data = []
    for genre in genre_list:
        genre_data = get_google_books(genre)
        data += genre_data
    return data 

books_data = get_book_data(genres)

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




pc = Pinecone(api_key="pcsk_3s7wbm_7EyXUi1NAupYJDc2SAeN9519GhqaSRk6YUMe1dV8w3JaUJxxTcgs6fxjVomyecy")

index_name = "nextbook-dense-py"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        vector_type="dense",
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        ),
        deletion_protection="disabled",
        tags={
            "environment": "development"
        }
    )

index = pc.Index(index_name)

# Prepare metadata
book_metadata = [{
    "title": b.get("title"),
    "author": ", ".join(b.get("authors", [])),
    "genre": b.get("categories", ["General"])[0],
    "pages": b.get("pageCount"),
    "rating": b.get("averageRating")
} for b in books_data]

# print(book_metadata)

# Create vector tuples
vectors = [
    (str(i), embeddings[i]) #Let's do it without Metadata for now
    for i in range(len(embeddings))
]

# Upsert in batches of 100
for i in range(0, len(vectors), 100):
    index.upsert(vectors=vectors[i:i+100])




# Test query
test_query = "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912."
query_embedding = model.encode(test_query).tolist()

results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=False
)

# print(results)

# for match in results['matches']:
    # print(f"{match['metadata']['title']} (Score: {match['score']:.2f})")

for match in results['matches']: #'matches' is a list of dictionaries 
    id = match['id']
    recommended_book = books_data[int(id)].get('title','Untitled')
    Score = match['score']
    percentage_score = str(round(Score,2)*100) + '%'
    # print(recommended_book, percentage_score)
    print(f"Book: {recommended_book} , Similarity Score: {percentage_score}")




