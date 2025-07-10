from pydantic import BaseModel

class Search(BaseModel): #this is the Post Request sent from the search page
    book : str
    