import requests
import tweepy
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .user_serializers import FollowingSerializer

from django.http import JsonResponse
from django.http import HttpResponseBadRequest

from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from django.shortcuts import render, redirect
from .decorators import twitter_login_required
from .models import TwitterUser, TwitterFollowers, TwitterAccessToken
from .authorization import create_update_user_from_twitter, check_token_still_valid
from twitter_api.twitter_api import TwitterAPI
from .users_helpers import *


from dotenv import load_dotenv
import os


# Create your views here.

load_dotenv()


@api_view(["Get"])
def twitter_login(request):
    twitter_api = TwitterAPI()
    # url, oauth_token, oauth_token_secret = twitter_api.twitter_login()
    url, code_verifier = twitter_api.twitter_login()
    request.session["code_verifier"] = code_verifier
    print("yyyyyyyyyyyyyyyyyy", url)

    if url is None or url == "":
        print("returneded nonee")
        return Response(
            data={"boolean": False, "message": "Unable to login. Please try again."}
        )
    else:
        # twitter_auth_token = TwitterAuthToken.objects.filter(
        #     oauth_token=oauth_token
        # ).first()
        # if twitter_auth_token is None or twitter_auth_token.oauth_token != oauth_token:
        #     twitter_auth_token = TwitterAuthToken(
        #         oauth_token=oauth_token, oauth_token_secret=oauth_token_secret
        #     )
        #     twitter_auth_token.save()
        # else:
        #     twitter_auth_token.oauth_token_secret = oauth_token_secret
        #     twitter_auth_token.save()
        return Response(
            data={
                "boolean": True,
                "message": "Successfully got auth token .",
                "url": url,
                # "token": oauth_token,
            }
        )


# get response url and use it to generate access token
@api_view(["Get", "Post"])
def callback_verifier(request):
    r_url = request.GET.get("response_url")
    if "http:" in r_url:
        r_url = "https:" + r_url[5:]
    if "error" in r_url:
        print("denied>>>>")
        return Response(
            data={
                "boolean": False,
                "message": "Unable to login or login cancelled. Please try again.",
            }
        )
    twitter_api = TwitterAPI()
    code_verifier = request.session.get("code_verifier")
    print("i got ehre", code_verifier)
    token = twitter_api.twitter_callback(r_url, code_verifier)

    if token is None:
        return Response(
            data={
                "boolean": False,
                "message": "Unable to get access token. Please try again.",
            }
        )
    new_access_token = token["access_token"]
    new_refresh_token = token["refresh_token"]
    print("access and refresh", new_refresh_token, new_access_token)
    twitter_access_token = TwitterAccessToken.objects.filter(
        access_token=new_access_token
    ).first()
    if twitter_access_token is None or twitter_access_token.access_token is None:
        twitter_access_token = TwitterAccessToken(
            access_token=new_access_token, refresh_token=new_refresh_token
        )
        twitter_access_token.save()
        # Create user
        info = twitter_api.get_me(new_access_token)
        if info is not None:
            print("user created")
            twitter_user_new = TwitterUser(
                id=info[0]["id"],
                username=info[0]["username"],
                name=info[0]["name"],
                profile_image_url=info[0]["profile_image_url"],
            )
            print(info[0]["profile_image_url"], "profile imagegeeeeee")
            twitter_user_new.twitter_access_token = twitter_access_token
            user, twitter_user = create_update_user_from_twitter(twitter_user_new)
            if user is not None:
                login(request, user)
                userId, username = twitter_user_new.id, twitter_user_new.username

                return Response(
                    data={
                        "boolean": True,
                        "message": "Successful Login",
                        "id": userId,
                        "username": username,
                    }
                )
        else:
            print("second last else ")
            return Response(
                data={
                    "boolean": False,
                    "message": "Unable to get profile details. Please try again.",
                }
            )

    else:
        print("last else ")

        return Response(
            data={
                "boolean": False,
                "message": "Unable to get access token. Please try again.",
            }
        )


# for checking if user is logged in
# @login_required
# @twitter_login_required
@api_view(["Get"])
def index(request):
    print("hey ", request.user)
    twitter_api = TwitterAPI()
    user = request.user
    try:
        twitter_user = TwitterUser.objects.get(user=user)
        if twitter_user is not None:
            if not twitter_login_required(request, twitter_user):
                print("had to use refresh token ")
                refresh_token = twitter_user.twitter_access_token.refresh_token
                new_access_token = twitter_api.update_token(twitter_user, refresh_token)
                twitter_user.twitter_access_token.access_token = new_access_token
                twitter_user.save()
            username = twitter_user.username
            name = twitter_user.name
            image = twitter_user.profile_image_url
            if (
                user
                and user.is_authenticated
                and twitter_login_required(request, twitter_user)
            ):
                return Response(
                    data={
                        "boolean": True,
                        "username": username,
                        "name": name,
                        "image": image,
                    }
                )

        return Response(data={"boolean": False})
    except:
        print("An error occured")
        return Response(data={"boolean": False})


@api_view(["Get"])
def followers(request):
    """remove twitter api call here after implementing new followers and unfollowers
    becasue  it becomes redundant cos we will call that view first"""
    userId = request.GET.get("id")
    user = TwitterUser.objects.get(id=userId)
    # old_followers = TwitterFollowers.objects.filter(user=user)

    # take  out next two lines
    f = get_follolwers(userId)
    fw = get_follolwing(userId)

    add_followers(f, user)
    add_following(fw, user)

    fset = TwitterFollowers.objects.values_list("id")
    fwset = TwitterFollowing.objects.values_list("id")

    not_following = fwset.exclude(id__in=fset)
    nfset = TwitterFollowing.objects.filter(id__in=not_following)
    # print(nfset.__dict__, "dicsdcsdjncisdjnc")
    # for i in nfset:
    #     print(i.id, i.profile_image_url)

    # return Response(data={"boolean": False})

    serializer = FollowingSerializer(nfset, many=True)
    return Response(serializer.data)


@api_view(["Post", "Get"])
def twitter_logout(request):
    print("got to logout")
    if request.user.is_authenticated:
        print("got to if authenticated >>")
        logout(request)
        return Response(data={"boolean": True})

    """ fully implement logout """
    return Response(data={"boolean": False})
    # return redirect("home")
