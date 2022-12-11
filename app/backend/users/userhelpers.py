from .models import TwitterFollowers, TwitterFollowing

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


def get_follolwers(userId):
    client = get_client()
    followers = []
    for f in tweepy.Paginator(
        client.get_users_followers,
        userId,
        user_fields=["profile_image_url"],
        max_results=1000,
    ).flatten():
        followers.append(f)
    return followers


def get_follolwing(userId):
    client = get_client()
    following = []
    for f in tweepy.Paginator(
        client.get_users_following,
        userId,
        user_fields=["profile_image_url"],
        max_results=1000,
    ).flatten():
        following.append(f)
    return following


def add_followers(followers, user):
    for f in followers:
        follower_new = TwitterFollowers(
            id=f.id,
            name=f.name,
            username=f.username,
            profile_image_url=f.profile_image_url,
            user=user,
        )
        follower_new.save()


def add_following(following, user):
    for fw in following:
        follower_new = TwitterFollowing(
            id=fw.id,
            name=fw.name,
            username=fw.username,
            profile_image_url=fw.profile_image_url,
            user=user,
        )
        follower_new.save()
