import asyncio
from scramjet.streams import Stream
import speech_recognition as sr
import pickle
import codecs


async def unpickle(input: pickle) -> sr.AudioData:
    audio_data = pickle.loads(codecs.decode(input.encode(), "base64"))
    return audio_data

async def recognize(audio: sr.AudioData) -> str:
    rec = sr.Recognizer()
    return rec.recognize_google(audio)

async def delayed(char: str) -> str:
    await asyncio.sleep(0.35)
    return char

async def run(context, input):
    data = await input.reduce(lambda a, b: a+b)
    audio = await unpickle(data)
    text = await recognize(audio)
    
    return Stream.read_from(text).map(delayed).each(lambda x: print(x, end=""))
