from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q

from .tweets_serializers import TweetSerializer
from .tweets_helpers import *

# Create your views here.


@api_view(["POST"])
def index(request):
    # id = request.POST.get("id")
    pass


@api_view(["GET", "POST"])
def bookmarks(request):
    user = TwitterUser.objects.prefetch_related("bookmarks").get(user=request.user)
    id = user.id
    first = get_first_bookmark(user)
    saved_first = user.first_bookmark

    if first == saved_first:
        print("same booksssssss")
        return Response(data={"boolean": True, "message": "No new bookmarks"})
    else:
        update_bookmarks(user)
        return Response(data={"boolean": True, "message": "New bookmarks added"})


@api_view(["GET"])
def search(request):
    q = request.GET.get("q")
    print(q, ">>>>>>>>>")
    twitter_user = TwitterUser.objects.prefetch_related("bookmarks").get(
        user=request.user
    )
    books = twitter_user.bookmarks.all().filter(
        Q(text__icontains=q) | Q(username__icontains=q) | Q(name__icontains=q)
    )

    serializer = TweetSerializer(books, many=True)
    return Response(serializer.data)
