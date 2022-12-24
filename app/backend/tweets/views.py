from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


from .tweets_helpers import *

# Create your views here.


@api_view(["POST"])
def index(request):
    # id = request.POST.get("id")
    pass


@api_view(["GET", "POST"])
def bookmarks(request):
    fi = open("out.txt", "w")
    print("got hererer")
    id = request.GET.get("id")
    first = get_first_bookmark(id)
    saved_first = TwitterUser.objects.get(id=id).first_bookmark
    print(first, saved_first)
    if first == saved_first:
        return Response(data={"boolean": True, "message": "No new bookmarks"})
    else:
        print("got tot else in bookamrks ", id)
        update_bookmarks(id)
        return Response(data={"boolean": True, "message": "New bookmarks added"})
    # bookmarks = get_bookmarks(id)
    # for f in bookmarks:
    #     k = f.includes["media"]
    #     for i in range(1):
    #         print(
    #             k[i]["preview_image_url"],
    #             "><>>><><><",
    #             k[i]["url"],
    #             "><>>><><><",
    #             k[i]["type"],
    #             "\n",
    #         )

    #     # print(k)
    #     # print(f.includes["media"], "\n")
    #     # L = f.includes.media
    #     fi.writelines(f"Included Medias: {f.data}\n")
    # fi.writelines(f"Included Users: {f.includes.get('users')}"))
    # print(bookmarks)
    # temp = bookmarks[0:4]
    # for tweet in temp:
    #     print(tweet.meta)
    # pass
    # client = get_client()
    return Response(data={"bool": True})
