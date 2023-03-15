from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth import login, logout
from django.conf import settings

from .models import TwitterUser, TwitterAccessToken
from .authorization import create_update_user_from_twitter, twitter_login_required
from twitter_api.twitter_api import TwitterAPI
from .users_helpers import *

from dotenv import load_dotenv


# Create your views here.

load_dotenv()


@api_view(["Get"])
def twitter_login(request):
    twitter_api = TwitterAPI()
    url, code_verifier = twitter_api.twitter_login()
    request.session["code_verifier"] = code_verifier

    if url is None or url == "":
        return Response(
            data={"boolean": False, "message": "Unable to login. Please try again."}
        )
    else:
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
        return Response(
            data={
                "boolean": False,
                "message": "Unable to login or login cancelled. Please try again.",
            }
        )
    twitter_api = TwitterAPI()
    code_verifier = request.session.get("code_verifier")
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
                TwitterAccessToken.objects.filter(user__isnull=True).delete()
                request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                settings.SESSION_EXPIRE_AT_BROWSER_CLOSE = False
                if not request.session.session_key:
                    request.session.create()
                request.session["userID"] = userId

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
@api_view(["Get"])
def index(request):
    print(
        "hey ",
        request.user,
        request.session.keys(),
        "//",
        request.session.items(),
        "//",
        request.session.session_key,
    )
    twitter_api = TwitterAPI()
    try:
        user = request.user
        user_id = request.session["userID"]
        twitter_user = TwitterUser.objects.get(id=user_id)
        if twitter_user is not None:
            # use refresh token if access token has expired, gets new access token
            if not twitter_login_required(request, twitter_user):
                refresh_token = twitter_user.twitter_access_token.refresh_token
                new_access_token, new_refresh_token = twitter_api.update_token(
                    refresh_token
                )

                twitter_access_token = TwitterAccessToken(
                    access_token=new_access_token, refresh_token=new_refresh_token
                )
                twitter_access_token.save()
                twitter_user.twitter_access_token = twitter_access_token
                twitter_user.save()
                TwitterAccessToken.objects.filter(user__isnull=True).delete()

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
    except Exception as e:
        return Response(data={"boolean": False, "message": e})


@api_view(["Post", "Get"])
def twitter_logout(request):
    print("got to logout")
    user = request.user
    print(user)
    if request.user.is_authenticated:
        twitter_user = TwitterUser.objects.get(user=user)
        twitter_user.bookmarks.all().delete()
        twitter_user.first_bookmark = None
        twitter_user.save()
        twitter_user.delete()
        logout(request)
        return Response(data={"boolean": True})

    """ fully implement logout """
    return Response(data={"boolean": False})
    # return redirect("home")
