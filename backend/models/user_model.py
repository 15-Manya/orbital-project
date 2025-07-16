from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserModel(BaseModel) :
    uid: str
    email: str
    username: Optional[str] = None
    age: Optional[int] = None
    preferredGenres: Optional[List[str]] = None
    genresToExplore: Optional[List[str]] = None
    favBooks: Optional[List[str]] = None
    readBooks: List[str] = []
    profile_complete: bool
