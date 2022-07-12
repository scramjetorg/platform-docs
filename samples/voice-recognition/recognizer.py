import codecs
import os
import pickle
import requests
import speech_recognition as sr

SCRAMJET_API_URL = os.environ.get('SCRAMJET_API_URL')
INSTANCE_ID = os.environ.get('INSTANCE_ID')
AUDIO_FILE = os.environ.get('AUDIO_FILE')

PATH = f'/instance/{INSTANCE_ID}/input'
# headers = { "Content-Type":  "application/octet-stream" }
HEADERS = { "Content-Type":  "text/plain" }

def main():
    audio_file = sr.AudioFile(AUDIO_FILE)
    rec = sr.Recognizer()
    with audio_file as source:
        audio_data = rec.record(source)
    data = codecs.encode(pickle.dumps(audio_data), "base64").decode()
    requests.post(SCRAMJET_API_URL+PATH, data=data, headers=HEADERS)


if __name__ == "__main__":
    main()
