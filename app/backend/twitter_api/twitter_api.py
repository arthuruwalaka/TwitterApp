import tweepy
from dotenv import load_dotenv
import os


class MyOAuth2UserHandler(tweepy.OAuth2UserHandler):
    # Kudos https://github.com/tweepy/tweepy/pull/1806

    def refresh_token(self, refresh_token, client_id):
        new_token = super().refresh_token(
            "https://api.twitter.com/2/oauth2/token",
            refresh_token=refresh_token,
            body=f"grant_type=refresh_token&client_id={client_id}",
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
        # oauth1_user_handler = tweepy.OAuthHandler(
        #     self.api_key, self.api_secret, callback=self.oauth_callback_url
        # )
        # url = oauth1_user_handler.get_authorization_url(signin_with_twitter=True)
        # request_token = oauth1_user_handler.request_token["oauth_token"]
        # request_secret = oauth1_user_handler.request_token["oauth_token_secret"]
        # return url, request_token, request_secret

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

    # def twitter_callback(self, oauth_verifier, oauth_token, oauth_token_secret):
    #     oauth1_user_handler = tweepy.OAuthHandler(
    #         self.api_key, self.api_secret, callback=self.oauth_callback_url
    #     )
    #     oauth1_user_handler.request_token = {
    #         "oauth_token": oauth_token,
    #         "oauth_token_secret": oauth_token_secret,
    #     }
    #     access_token, access_token_secret = oauth1_user_handler.get_access_token(
    #         oauth_verifier
    #     )
    #     return access_token, access_token_secret

    def get_me(self, token):
        try:
            print("token", token)
            client = tweepy.Client(token)
            info = client.get_me(
                user_auth=False,
                user_fields=["profile_image_url"],
            )
            return info
        except Exception as e:
            print(e)
            return None

    def update_token(self, user, token):
        # oauth2_user_handler = tweepy.OAuth2UserHandler(
        #     client_id=self.client_id,
        #     redirect_uri=self.oauth_callback_url,
        #     scope=[
        #         "bookmark.read",
        #         "bookmark.write",
        #         "tweet.read",
        #         "users.read",
        #         "offline.access",
        #     ],
        #     # Client Secret is only necessary if using a confidential client
        #     client_secret=self.client_secret,
        # )
        # print("refresh token ", token)
        # # new_access_token = oauth2_user_handler.refresh_token(token)

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

        new_token = auth.refresh_token(token, self.client_id)
        print("newwwwww token ", new_token)

        return None

    # def get_me(self, access_token, access_token_secret):
    #     try:
    #         client = tweepy.Client(
    #             consumer_key=self.api_key,
    #             consumer_secret=self.api_secret,
    #             access_token=access_token,
    #             access_token_secret=access_token_secret,
    #         )
    #         info = client.get_me(
    #             user_auth=True,
    #             user_fields=["profile_image_url"],
    #         )
    #         return info
    #     except Exception as e:
    #         print(e)
    #         return None
