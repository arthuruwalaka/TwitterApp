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
        twitterUser = TwitterUser.objects.get(id=userId)
        access_token = twitterUser.twitter_access_token.access_token
        client = tweepy.Client(access_token, wait_on_rate_limit=True)
        return client
    except Exception as e:
        print(e)
        return None


# checks for new bookmarks
def get_first_bookmark(user):
    id = user.id
    client = get_client(id)
    first_bookmark = client.get_bookmarks(max_results=1)
    return str(first_bookmark.data[0]["id"])


# returns a paginator for searching bookmarks
def get_bookmarks(userId):
    client = get_client(userId)
    pa = tweepy.Paginator(
        client.get_bookmarks,
        expansions=["attachments.media_keys", "author_id"],
        media_fields=["url", "preview_image_url", "type"],
        user_fields=["name", "username", "profile_image_url", "protected", "verified"],
        max_results=5,
        limit=2,
    )
    return pa


# updates bookmarks in data base if new bookmarks have  been added
def update_bookmarks(user):
    id = user.id
    bookmarks = get_bookmarks(id)
    first_bookmark = get_first_bookmark(user)
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
                image=profile_img,
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
            user.bookmarks.add(new_tweet)
    user.first_bookmark = first_bookmark
    user.save(update_fields=["first_bookmark"])
