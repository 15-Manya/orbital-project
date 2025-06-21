from fastapi import APIRouter, HTTPException
from datetime import datetime
import openai
from database.connection import user_collection
from pydantic import BaseModel

router = APIRouter()
openai.api_key = "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"


def build_prompt(user_data, user_input) :
    preferredGenres = user_data.get('preferredGenres', [])
    genresToExplore = user_data.get('genresToExplore', [])
    favBooks = user_data.get('favBooks', [])
    pastChats = user_data.get('chatHistory', [])[-3:]

    system_prompt = "You are a friendly book recommendation assisant for a platform called NextBook."

    user_prompt = "This is what we know about the user:\n"

    if preferredGenres :
        user_prompt += f"-The user enjoys reading genres like {', '.join(preferredGenres)}.\n"
    if genresToExplore :
        user_prompt += f"-The user wants to explore reading genres like {', '.join(genresToExplore)}.\n"
    if favBooks :
        user_prompt += f"Some of the users favourite books are {', '.join(favBooks)}.\n"
    if pastChats :
        user_prompt += 'These are some of the recent chats with the user:\n'
        for chat in pastChats:
            user_msg = chat.get("userMessage", "")
            gpt_msg = chat.get("gptResponse", "")
            user_prompt += f"- They said: \"{user_msg}\"\n  You replied: \"{gpt_msg}\"\n"
    
    user_prompt += f"\nNow they say: \"{user_input}\"\n"
    user_prompt += "Based on the information given above, give user a relevant response to their questions in a friendly and helpful way"

    return [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': user_prompt}
    ]


@router.post('/chat')
def chat_bot(username: str, user_input: str) :
    user_data = user_collection.find_one({'username': username})
    if not user_data :
        raise HTTPException(status_code = 404, detail = 'User not found')

    prompt = build_prompt(user_data, user_input)

    try :
        response = openai.ChatCompletion.create(
            model = 'gpt-4',
            messages = prompt
        )
    
        gpt_response = response['choices'][0]['message']['content'].strip()

        chat_history = {
            'userMessage' : user_input,
            'gptResponse' : gpt_response,
            'timestamp': datetime.utcnow()
        }

        user_collection.update_one(
            {"_id": user_data["_id"]},
            {"$push": {"chatHistory": chat_history}}
        )

        return {'response': gpt_response}

    except Exception as e :
        raise HTTPException(status_code = 500, detail = f"OpenAI error : {str(e)}")
