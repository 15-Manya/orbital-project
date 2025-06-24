from pydantic import BaseModel


class HomeModel(BaseModel): #this is for the Post Request sent by the home page
    username: str
    

