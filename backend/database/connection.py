from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

#Setting up the database
MONGO_URL = "mongodb+srv://techTitans:techTitansGo@nextbook.xui6btl.mongodb.net/?retryWrites=true&w=majority&appName=NextBook"
client = MongoClient(MONGO_URL, server_api=ServerApi('1'), tlsCAFile=certifi.where()) # Create a new client and connect to the server


db = client['NextBook']
user_collection = db['users']


#user_collection.insert_one({"username": "manya"})
#print(user_collection.find_one({"username": "manya"})
