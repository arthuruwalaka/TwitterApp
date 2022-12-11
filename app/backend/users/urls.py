from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("twitter_login/", views.twitter_login, name="twitter_login"),
    path("callback_verifier/", views.callback_verifier, name="callback_verifier"),
    path("twitter_logout/", views.twitter_logout, name="twitter_logout"),
    path("followers/", views.followers, name="followers"),
]
