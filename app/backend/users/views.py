import tweepy
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .user_serializers import UserSerializer

from dotenv import load_dotenv
import os


from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

load_dotenv()


@api_view(["GET", "POST"])
def open_path(request):
    """
    handles paths courses/
    adds a course and gets a list of courses
    """
    screen_name = "talktoEM_"
    if request.method == "GET":
        client = tweepy.Client(os.getenv("BEARER_TOKEN"))
        user = client.get_user(username=screen_name)
        # print(user, "000000000000000000")
        ID = user.data.id
        # print(user, ID, "000000000000000000")
        # followers = client.get_users_followers(id=ID)
        # print(followers)
        # with open("../../out.txt", "w") as f:
        #     print(followers, file=f)
        print(user, "000000000000000000")
        serializer = UserSerializer(user.data)
        return Response(serializer.data)
