from database.pinecone import model,index,books_data

# Test query
test_query = "How to Win Frienda and Influence People"
test_query2 = "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912."

def get_recommendation(test_query):
    query_embedding = model.encode(test_query).tolist()

    results = index.query(
        vector=query_embedding,
        top_k=5,
        include_metadata=False
    )

    books = []
    for match in results['matches']: #'matches' is a list of dictionaries 
        id = match['id']
        recommended_book = books_data[int(id)].get('title','Untitled')
        Score = match['score']
        percentage_score = str(round(Score,2)*100) + '%'
        # print(recommended_book, percentage_score)
        books = books + [recommended_book]
        # print(f"Book: {recommended_book} , Similarity Score: {percentage_score}")
    return books
    
recommendations = get_recommendation(test_query)
