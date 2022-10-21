import tweepy
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .user_serializers import UserSerializer

from django.http import JsonResponse

from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .decorators import twitter_login_required
from .models import TwitterAuthToken, TwitterUser
from .authorization import create_update_user_from_twitter, check_token_still_valid
from twitter_api.twitter_api import TwitterAPI


from dotenv import load_dotenv
import os


# Create your views here.

load_dotenv()


# @api_view(["GET", "POST"])
# def open_path(request):
#     """
#     handles paths courses/
#     adds a course and gets a list of courses
#     """
#     screen_name = "talktoEM_"
#     if request.method == "GET":
#         client = tweepy.Client(os.getenv("BEARER_TOKEN"))
#         user = client.get_user(username=screen_name)
#         # print(user, "000000000000000000")
#         ID = user.data.id
#         # print(user, ID, "000000000000000000")
#         # followers = client.get_users_followers(id=ID)
#         # print(followers)
#         # with open("../../out.txt", "w") as f:
#         #     print(followers, file=f)
#         print(user, "000000000000000000")
#         serializer = UserSerializer(user.data)
#         return Response(serializer.data)


def twitter_login(request):
    twitter_api = TwitterAPI()
    url, oauth_token, oauth_token_secret = twitter_api.twitter_login()
    if url is None or url == "":
        messages.add_message(
            request, messages.ERROR, "Unable to login. Please try again."
        )
        return render(request, "authorization/error_page.html")
    else:
        twitter_auth_token = TwitterAuthToken.objects.filter(
            oauth_token=oauth_token
        ).first()
        if twitter_auth_token is None:
            twitter_auth_token = TwitterAuthToken(
                oauth_token=oauth_token, oauth_token_secret=oauth_token_secret
            )
            twitter_auth_token.save()
        else:
            twitter_auth_token.oauth_token_secret = oauth_token_secret
            twitter_auth_token.save()
        return redirect(url)


def twitter_callback(request):
    if "denied" in request.GET:
        messages.add_message(
            request,
            messages.ERROR,
            "Unable to login or login canceled. Please try again.",
        )
        return render(request, "authorization/error_page.html")
    twitter_api = TwitterAPI()
    oauth_verifier = request.GET.get("oauth_verifier")
    oauth_token = request.GET.get("oauth_token")
    twitter_auth_token = TwitterAuthToken.objects.filter(
        oauth_token=oauth_token
    ).first()
    if twitter_auth_token is not None:
        access_token, access_token_secret = twitter_api.twitter_callback(
            oauth_verifier, oauth_token, twitter_auth_token.oauth_token_secret
        )
        if access_token is not None and access_token_secret is not None:
            twitter_auth_token.oauth_token = access_token
            twitter_auth_token.oauth_token_secret = access_token_secret
            twitter_auth_token.save()
            # Create user
            info = twitter_api.get_me(access_token, access_token_secret)
            if info is not None:
                twitter_user_new = TwitterUser(
                    id=info[0]["id"],
                    username=info[0]["username"],
                    name=info[0]["name"],
                    profile_image_url=info[0]["profile_image_url"],
                )
                twitter_user_new.twitter_oauth_token = twitter_auth_token
                user, twitter_user = create_update_user_from_twitter(twitter_user_new)
                if user is not None:
                    login(request, user)
                    return redirect("index")
            else:
                messages.add_message(
                    request,
                    messages.ERROR,
                    "Unable to get profile details. Please try again.",
                )
                return render(request, "authorization/error_page.html")
        else:
            messages.add_message(
                request, messages.ERROR, "Unable to get access token. Please try again."
            )
            return render(request, "authorization/error_page.html")
    else:
        messages.add_message(
            request,
            messages.ERROR,
            "Unable to retrieve access token. Please try again.",
        )
        return render(request, "authorization/error_page.html")


@login_required
@twitter_login_required
def index(request):
    return render(request, "authorization/home.html")


@login_required
def twitter_logout(request):
    print(request, "kjnsvsbuobvsoubvsdoubvwoud")
    logout(request)
    print("i came herererere")
    return redirect("index")
