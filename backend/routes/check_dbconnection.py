from fastapi import APIRouter
from database.connection import client

router = APIRouter()

# Send a ping to confirm a successful connection
@router.get('/test-db')
def test_db() :
    try:
        client.admin.command('ping')
        return {'message': "Pinged your deployment. You successfully connected to MongoDB!"}
    except Exception as e:
        return {'message': "Connection failed", "error": str(e)}