import os
from users.models import TwitterUser
from .models import Media, Tweets
from dotenv import load_dotenv
import tweepy
from twitter_api.twitter_api import TwitterAPI
import re


load_dotenv()

TWEET_LINK = "https://twitter.com/twitter/statuses/"


def get_client(userId):
    try:
        api = TwitterAPI()
        # api.get_me()
        twitterUser = TwitterUser.objects.get(id=userId)
        print(twitterUser, "ythis isd user")
        access_token = twitterUser.twitter_access_token.access_token
        print(access_token, "this is acces token")
        print(api.get_me(access_token), "get meeeee")
        bearer = os.getenv("BEARER_TOKEN")
        client = tweepy.Client(access_token, wait_on_rate_limit=True)
        print("client", client)
        return client
    except Exception as e:
        print(e)
        return None


# checks for new bookmarks
def get_first_bookmark(userId):

    client = get_client(userId)
    first_bookmark = client.get_bookmarks(max_results=1)
    print(first_bookmark, "first_bookmakr")
    return first_bookmark.data[0]["id"]


def get_bookmarks(userId):
    client = get_client(userId)
    bookmarks = []
    pa = tweepy.Paginator(
        client.get_bookmarks,
        expansions=["attachments.media_keys", "author_id"],
        media_fields=["url", "preview_image_url", "type"],
        user_fields=["name", "username", "profile_image_url", "protected", "verified"],
        max_results=3,
        limit=2,
    )
    # bookmarks.append(f)
    return pa


# updates bookmarks in data base if new bookmarks have  been added
def update_bookmarks(userId):
    bookmarks = get_bookmarks(userId)
    first_bookmark = get_first_bookmark(userId)
    twitter_user = TwitterUser.objects.get(id=userId)
    twitter_user.first_bookmark = first_bookmark
    twitter_user.save(update_fields=["first_bookmark"])
    for page in bookmarks:
        data = page.data
        media = page.includes.get("media")
        users = page.includes.get("users")
        for t in data:
            # handle tweet texts and get tweet id
            id = t.id
            text = re.sub(r"https://t.co/\w{10}", "", t.text)
            url = str(TWEET_LINK + str(id))

            # get user details from tweet
            author_id = t.author_id
            t_author = next(obj for obj in users if obj.id == author_id)
            name = t_author.name
            username = t_author.username
            profile_img = t_author.profile_image_url
            is_protected = t_author.protected
            is_verified = t_author.verified

            new_tweet = Tweets(
                id=id,
                url=url,
                text=text,
                username=username,
                name=name,
                profile_img=profile_img,
                verified=is_verified,
                protected=is_protected,
            )
            new_tweet.save()

            # get tweets media if it contains media
            if t.get("attachments"):
                media_keys = t.get("attachments").get("media_keys")
                new_tweet.is_media = True

                for key in media_keys:
                    medium = next(obj for obj in media if obj.media_key == key)

                    url = medium.url or medium.preview_image_url
                    m_type = medium.type
                    new_media = Media(id=key, type=m_type, url=url)
                    new_media.save()

                    new_tweet.media_urls.add(new_media)
                new_tweet.save(update_fields=["is_media"])
            else:
                has_media = False
            twitter_user.bookmarks.add(new_tweet)
