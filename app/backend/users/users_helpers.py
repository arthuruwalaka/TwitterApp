import os
from dotenv import load_dotenv
import tweepy

load_dotenv()


def get_client():
    try:
        bearer = os.getenv("BEARER_TOKEN")
        client = tweepy.Client(bearer)
        return client
    except Exception as e:
        print(e)
        return None
