import requests
from sentence_transformers import SentenceTransformer
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from database.connection import book_data

def get_google_books(query, max_results=40):
    base_url = "https://www.googleapis.com/books/v1/volumes"
    results = []
    for start in range(0,200, max_results):
        params = {
            "q": query,
            "maxResults": max_results,
            'startIndex': start,
            "key": "AIzaSyDqOV61F-dS3SLCO7CODBFLdbkP0sULfD0"
        }
        response = requests.get(base_url, params=params).json()
        results.extend([item['volumeInfo'] for item in response.get('items', [])])
    return results


#Get 40 books of each genre
genres = ["programming","history", "sci-fi", "romantic","thriller","fantasy","fiction","self-help", 'action', 'adventure', 'comedy', 'crime', 'mystery', 'fantasy','history','horror','romance', 'thriller', 'non-fiction']

def get_book_data(genre_list): 
    data = []
    for genre in genre_list:
        genre_data = get_google_books(genre)
        data += genre_data
    return data 

if book_data.count_documents({}) == 0:
    book_data.insert_one({'data': get_book_data(genres)})

doc = book_data.find_one()
books_data = doc['data']

def create_book_description(book):
    return f"""
    {book.get('title', 'Untitled')} by {', '.join(book.get('authors', ['Unknown']))}.
    Published: {book.get('publishedDate', 'N/A')}.
    {book.get('description', 'No description available')}
    Genres: {', '.join(book.get('categories', ['General']))}.
    {book.get('pageCount', '')} pages. 
    Average Rating: {book.get('averageRating', 'Unrated')}/5.
    """

#model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
#descriptions = [create_book_description(b) for b in books_data]
#embeddings = model.encode(descriptions).tolist()  # Converts to 384D vectors




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
#vectors = [
#    (str(i), embeddings[i]) #Let's do it without Metadata for now
#    for i in range(len(embeddings))
#]


# Upsert in batches of 100
#for i in range(0, len(vectors), 100):
#    index.upsert(vectors=vectors[i:i+100])*/