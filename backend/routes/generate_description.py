from fastapi import APIRouter, HTTPException
from openai import OpenAI
from database.connection import user_collection
from pydantic import BaseModel
from dotenv import load_dotenv
import os


load_dotenv()
router = APIRouter()
client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))
description = {}

class UsernameRequest(BaseModel):
    username: str

def build_prompt(user_data) :
    preferredGenres = user_data.get('preferredGenres', [])
    genresToExplore = user_data.get('genresToExplore', [])
    favBooks = user_data.get('favBooks', [])
    readBooks = user_data.get('readBooks', [])

    system_prompt = "You have to write a reader description for the user in 500 characters."

    user_prompt = "This is what we know about the user:\n"

    if preferredGenres :
        user_prompt += f"-The user enjoys reading genres like {', '.join(preferredGenres)}.\n"
    if genresToExplore :
        user_prompt += f"-The user wants to explore reading genres like {', '.join(genresToExplore)}.\n"
    if favBooks :
        user_prompt += f"Some of the users favourite books are {', '.join(favBooks)}.\n"
    if readBooks :
        user_prompt += f"These are some books read by the user: {', '.join(readBooks)}.\n"
    
    user_prompt += "Based on the information given above, give user personalised description of the user as a reader within 500 characters, it can include their vision, their nature and what they usually tend to see when they look at the world in general."

    return [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': user_prompt}
    ]


@router.post('/generate_description')
def generate_description(payload: UsernameRequest) :
    username = payload.username
    user_data = user_collection.find_one({'username': username})

    if not user_data :
        raise HTTPException(status_code = 404, detail = 'User not found')

    prompt = build_prompt(user_data)

    if username in description :
        return {'response' : description[username]}

    try :
        response = client.chat.completions.create(
            model = 'gpt-4',
            messages = prompt
        )
    
        gpt_response = response.choices[0].message.content.strip()
        description[username] = gpt_response
        return {'response': gpt_response}

    except Exception as e :
        raise HTTPException(status_code = 500, detail = f"OpenAI error : {str(e)}")
