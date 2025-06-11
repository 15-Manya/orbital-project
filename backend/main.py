from fastapi import FastAPI
import requests
from pinecone import Pinecone, ServerlessSpec
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

print(descriptions[0])

pc = Pinecone(api_key="pcsk_3s7wbm_7EyXUi1NAupYJDc2SAeN9519GhqaSRk6YUMe1dV8w3JaUJxxTcgs6fxjVomyecy")

index_name = "nextbook-index"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",           # or "gcp" if that's your region
            region="us-east-1"     # match your Pinecone dashboard
        ),
        deletion_protection="disabled"
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

# Create vector tuples
vectors = [
    (str(i), embeddings[i], book_metadata[i]) 
    for i in range(len(embeddings))
]

# Upsert in batches of 100
for i in range(0, len(vectors), 100):
    index.upsert(vectors=vectors[i:i+100])


# Test query
test_query = "Books about AI and ethics"
query_embedding = model.encode(test_query).tolist()

results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)

# for match in results['matches']:
#     print(f"{match['metadata']['title']} (Score: {match['score']:.2f})")
