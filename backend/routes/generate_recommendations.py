from database.pinecone import model,index,books_data
import random
from openai import OpenAI
import os 
from dotenv import load_dotenv
load_dotenv()
# Test query
test_query = "Rich Dad Poor Dad"
test_query2 = "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912."

client = OpenAI()

def get_ai_description(book_name):
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

    return completion.choices[0].message.content
# description = get_ai_description('Atomic Habits')

def get_general_recommendation(book1, book2, book3): 
    description1 = get_ai_description(book1)
    description2 = get_ai_description(book2)
    description3 = get_ai_description(book3)

    lst1 = model.encode(description1).tolist()
    lst2 = model.encode(description2).tolist()
    lst3 = model.encode(description3).tolist()

    vectors = []
    for i in range(len(lst1)): 
        number = (lst1[i] + lst2[i] + lst3[i])/3
        vectors = vectors + [number]
    
    results = index.query(
        vector= vectors,
        top_k=30,
        include_metadata=False
    )

    books = []
    links = []
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

        links = links + [image_url]

        Score = match['score']
        percentage_score = str(round(Score,2)*100) + '%'
        # print(recommended_book, percentage_score)
        books = books + [recommended_book]
    recommendation = list(zip(books,links))


        #filter our duplicates
    for item in recommendation: 
        if item[0] not in seen:
            seen.add(item[0])
            unique_recommendations.append(item)
    final_recommendations = random.sample(unique_recommendations,10)

    
    return final_recommendations


def get_recommendation(book_name):
    description = get_ai_description(book_name)
    print('Description: ', description)
    query_embedding = model.encode(description).tolist()

    results = index.query(
        vector=query_embedding,
        top_k=30,
        include_metadata=False
    )

    books = []
    links = []
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

        links = links + [image_url]

        Score = match['score']
        percentage_score = str(round(Score,2)*100) + '%'
        # print(recommended_book, percentage_score)
        books = books + [recommended_book]
    recommendation = list(zip(books,links))


        #filter our duplicates
    for item in recommendation: 
        if item[0] not in seen:
            seen.add(item[0])
            unique_recommendations.append(item)
    final_recommendations = random.sample(unique_recommendations,10)

    
    return final_recommendations
    
recommendations3 = get_recommendation('Atomic Habits') #Contains a list of tuples. Each tuple has 2 elements, first element is the book name and second is its image URL 
# recommendations2 = get_recommendation('Midnight Library')
# recommendations3 = get_recommendation('The Alchemist')