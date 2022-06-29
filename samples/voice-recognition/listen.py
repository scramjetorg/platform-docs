import speech_recognition as sr
import codecs
import pickle
import os
import requests
import time

SCRAMJET_API_URL = os.environ.get('SCRAMJET_API_URL')
INSTANCE_ID = os.environ.get('INSTANCE_ID')

PATH = f'/instance/{INSTANCE_ID}/input'
HEADERS = { "Content-Type":  "text/plain" }
# HEADERS = { "Content-Type":  "application/octet-stream" }

def main():
    rec = sr.Recognizer()
    mic = sr.Microphone()
    with mic as source:
        rec.adjust_for_ambient_noise(source)
        audio = rec.listen(source)

    data = codecs.encode(pickle.dumps(audio), "base64").decode()
    requests.post(SCRAMJET_API_URL+PATH, data=data, headers=HEADERS)

    for _ in range(50):
        time.sleep(0.1)

if __name__ == "__main__":
    main()
