from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class UserModel(BaseModel) :
    username : str = Field(..., min_length=3, max_length=50)
    age : int = Field(..., gt=8, lt=100)
    preferred_genres : List[str] = Field(..., min_items = 1)
    genres_to_explore : List[str] = Field(..., min_items = 1)
    fav_books : List[str] = Field(..., min_items = 1, max_items = 3)
    created_at : datetime = Field(default_factory=datetime.utcnow)
    profile_complete : bool = Field(default=False)
