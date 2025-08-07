from database.pinecone import index, books_data
from database.connection import book_data
from fastembed import TextEmbedding
from bson import ObjectId
import random
from openai import OpenAI
from dotenv import load_dotenv
import psutil
import os
import gc
from cachetools import LRUCache
from functools import lru_cache
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/recommendations", tags=['recommendations'])

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Memory before model loading
process = psutil.Process(os.getpid())
print("Before model loading:", process.memory_info().rss / 1024 ** 2, "MB")

model = TextEmbedding()

# Memory after model loading
print("After model loading:", process.memory_info().rss / 1024 ** 2, "MB")

# Test query
test_query = "Rich Dad Poor Dad"
test_query2 = "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912."

ai_description_cache = LRUCache(maxsize=100)
vector_cache = LRUCache(maxsize=100)
def get_ai_description(book_name):
    book = book_data.find_one({
        "title": {"$regex": f"^{book_name}$", "$options": "i"}
    })
    if book and book.get("description", "").strip():
        return book["description"]

    if book_name in ai_description_cache:
        return ai_description_cache[book_name]

    system_prompt = "You are a librarian. Your job is to provide a detailed summary of a book based on it's title. Your description must include, but not limited to, the name, author, genre, as well as a detailed (minimum 100 word) description on what the book is about. Make the language in a tone that a librarian would use to give details about a book."

    user_prompt = f"Please provide me a detailed description about the book called {book_name} in around 100-200 words. Avoid using any words like 'Certainly' or 'Sure' at the start of your answer, and begin with the description straight away"

    completion = client.chat.completions.create(
        model="gpt-4.1",

        messages=[
            {
                "role": "developer",
                "content": system_prompt 
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    result = completion.choices[0].message.content
    ai_description_cache[book_name] = result
    return result
# description = get_ai_description('Atomic Habits')

def get_vector(description) :
    if description in vector_cache :
        return vector_cache[description]
    
    vec = list(model.embed(description))[0].tolist()
    vector_cache[description] = vec
    return vec

def get_general_recommendation(book1, book2, book3): 
    lst1 = get_vector(get_ai_description(book1))
    lst2 = get_vector(get_ai_description(book2))
    lst3 = get_vector(get_ai_description(book3))
    gc.collect()

    vectors = []
    for i in range(len(lst1)): 
        number = (lst1[i] + lst2[i] + lst3[i])/3
        vectors = vectors + [number]
    
    results = index.query(
        vector= vectors,
        top_k=30,
        include_metadata=False
    )

    del lst1, lst2, lst3, vectors
    gc.collect()

    books = []
    links = []
    description = []
    seen = set()
    unique_recommendations = []
    for match in results['matches']: #'matches' is a list of dictionaries 
        id = match['id']
        recommended_book = books_data[int(id)].get('title','Untitled')

        #Get the links
        image_links = books_data[int(id)].get('imageLinks',{})
        image_url = None
        if image_links:
            # Prefer thumbnail, fallback to smallThumbnail
            thumbnail_url = image_links.get('thumbnail') or image_links.get('smallThumbnail')
            if thumbnail_url:
                # Enhance image quality and force HTTPS
                image_url = thumbnail_url.replace("zoom=1", "zoom=0").replace("http://", "https://")

        links.append(image_url)

        #Get the descriptions
        book_description = books_data[int(id)].get('description', 'No description available')
        description.append(book_description)

        Score = match['score']
        percentage_score = str(round(Score,2)*100) + '%'
        # print(recommended_book, percentage_score)
        #print(description)
        books.append(recommended_book)
    recommendation = list(zip(books,links,description))
    
    del results
    gc.collect()

        #filter our duplicates
    for item in recommendation: 
        if item[0] not in seen:
            seen.add(item[0])
            unique_recommendations.append(item)
    final_recommendations = random.sample(unique_recommendations,10)    
    return final_recommendations


def get_recommendation(book_name, number = 10):
    query_embedding = get_vector(get_ai_description(book_name))
    gc.collect()

    results = index.query(
        vector=query_embedding,
        top_k=50,
        include_metadata=False
    )
    del query_embedding
    gc.collect()

    books = []
    links = []
    description = []
    seen = set()
    unique_recommendations = []
    for match in results['matches']: #'matches' is a list of dictionaries 
        id = match['id']
        recommended_book = books_data[int(id)].get('title','Untitled')

        #Get the links
        image_links = books_data[int(id)].get('imageLinks',{})
        image_url = None
        if image_links:
            # Prefer thumbnail, fallback to smallThumbnail
            thumbnail_url = image_links.get('thumbnail') or image_links.get('smallThumbnail')
            if thumbnail_url:
                # Enhance image quality and force HTTPS
                image_url = thumbnail_url.replace("zoom=1", "zoom=0").replace("http://", "https://")

        links.append(image_url)

        #Get the descriptions
        book_description = books_data[int(id)].get('description', 'No description available')
        description.append(book_description)

        Score = match['score']
        percentage_score = str(round(Score,2)*100) + '%'
        # print(recommended_book, percentage_score)
        books.append(recommended_book)
    recommendation = list(zip(books,links, description))

    del results
    gc.collect()

        #filter our duplicates
    for item in recommendation: 
        if item[0] not in seen:
            seen.add(item[0])
            unique_recommendations.append(item)
    final_recommendations = random.sample(unique_recommendations,number)

    
    return final_recommendations
    
if __name__ == "__main__":
    recommendations3 = get_general_recommendation('Atomic Habits', 'Midnight Library', 'The Alchemist')
    print(recommendations3)
    #Contains a list of tuples. Each tuple has 2 elements, first element is the book name and second is its image URL 
# recommendations2 = get_recommendation('Midnight Library')
#recommendations3 = get_recommendation('The Alchemist')
#print(recommendations3)

def get_memory_usage_mb():
    process = psutil.Process(os.getpid())
    mem = process.memory_info().rss  # in bytes
    return mem / (1024 * 1024)  # in MB

print(f"Memory usage total: {get_memory_usage_mb():.2f} MB")

