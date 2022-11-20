import tweepy
from dotenv import load_dotenv
import os


class TwitterAPI:
    def __init__(self):
        self.api_key = os.getenv("API_KEY")
        self.api_secret = os.getenv("API_KEY_SECRET")
        self.client_id = os.getenv("CLIENT_ID")
        self.client_secret = os.getenv("CLIENT_SECRET")
        self.oauth_callback_url = os.getenv("CALLBACK_URL")

    def twitter_login(self):
        oauth1_user_handler = tweepy.OAuthHandler(
            self.api_key, self.api_secret, callback=self.oauth_callback_url
        )
        url = oauth1_user_handler.get_authorization_url(signin_with_twitter=True)
        request_token = oauth1_user_handler.request_token["oauth_token"]
        request_secret = oauth1_user_handler.request_token["oauth_token_secret"]
        return url, request_token, request_secret

    def twitter_callback(self, oauth_verifier, oauth_token, oauth_token_secret):
        oauth1_user_handler = tweepy.OAuthHandler(
            self.api_key, self.api_secret, callback=self.oauth_callback_url
        )
        oauth1_user_handler.request_token = {
            "oauth_token": oauth_token,
            "oauth_token_secret": oauth_token_secret,
        }
        access_token, access_token_secret = oauth1_user_handler.get_access_token(
            oauth_verifier
        )
        return access_token, access_token_secret

    def get_me(self, access_token, access_token_secret):
        try:
            client = tweepy.Client(
                consumer_key=self.api_key,
                consumer_secret=self.api_secret,
                access_token=access_token,
                access_token_secret=access_token_secret,
            )
            info = client.get_me(
                user_auth=True,
                expansions="pinned_tweet_id",
                user_fields=["profile_image_url"],
            )
            return info
        except Exception as e:
            print(e)
            return None
