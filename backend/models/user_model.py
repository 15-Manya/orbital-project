from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class UserModel(BaseModel) :
    username: str
    age: int
    preferredGenres: List[str]
    genresToExplore: List[str]
    favBooks: List[str]
    profile_complete: bool
