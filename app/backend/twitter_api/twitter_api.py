import tweepy
from dotenv import load_dotenv
import os
import inspect

# custom auth class to allow for refresh token. extends tweepy authx
class MyOAuth2UserHandler(tweepy.OAuth2UserHandler):
    # Kudos https://github.com/tweepy/tweepy/pull/1806

    # used to refresh twitter access token
    def refresh_token(self, refresh_token):
        new_token = super().refresh_token(
            "https://api.twitter.com/2/oauth2/token",
            refresh_token=refresh_token,
            body=f"grant_type=refresh_token&client_id={self.client_id}",
        )
        return new_token


class TwitterAPI:
    def __init__(self):
        self.api_key = os.getenv("API_KEY")
        self.api_secret = os.getenv("API_KEY_SECRET")
        self.client_id = os.getenv("CLIENT_ID")
        self.client_secret = os.getenv("CLIENT_SECRET")
        self.oauth_callback_url = os.getenv("CALLBACK_URL")

    def twitter_login(self):
        oauth2_user_handler = MyOAuth2UserHandler(
            client_id=self.client_id,
            redirect_uri=self.oauth_callback_url,
            scope=[
                "bookmark.read",
                "bookmark.write",
                "tweet.read",
                "users.read",
                "offline.access",
            ],
            # Client Secret is only necessary if using a confidential client
            client_secret=self.client_secret,
        )
        url = oauth2_user_handler.get_authorization_url()
        code_verifier = oauth2_user_handler._client.code_verifier
        return url, code_verifier

    def twitter_callback(self, url, code_verifier):
        try:
            oauth2_user_handler = MyOAuth2UserHandler(
                client_id=self.client_id,
                redirect_uri=self.oauth_callback_url,
                scope=[
                    "bookmark.read",
                    "bookmark.write",
                    "tweet.read",
                    "users.read",
                    "offline.access",
                ],
                # Client Secret is only necessary if using a confidential client
                client_secret=self.client_secret,
            )
            oauth2_user_handler._client.code_verifier = code_verifier
            access_token = oauth2_user_handler.fetch_token(url)
            return access_token
        except Exception as e:
            print("error ooccured", e)
            return None

    def get_me(self, token):
        try:
            client = tweepy.Client(token)
            info = client.get_me(
                user_auth=False,
                user_fields=["profile_image_url"],
            )
            return info
        except Exception as e:
            return None

    # update access token using refresh token. return both tokens to be stored in db
    def update_token(self, token):
        try:

            auth = MyOAuth2UserHandler(
                client_id=self.client_id,
                redirect_uri=self.oauth_callback_url,
                scope=[
                    "bookmark.read",
                    "bookmark.write",
                    "tweet.read",
                    "users.read",
                    "offline.access",
                ],
                # Client Secret is only necessary if using a confidential client
                client_secret=self.client_secret,
            )

            new_token = auth.refresh_token(token)
            access_token = new_token["access_token"]
            refresh_token = new_token["refresh_token"]
        except Exception as e:
            print("update token error", e)

        return access_token, refresh_token
