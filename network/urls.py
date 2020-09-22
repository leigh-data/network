
from django.urls import path

from . import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("following/", views.FollowingView.as_view(), name="following"),
    path("api/posts/<int:pk>/",
         views.PostUpdateView.as_view(), name="update"),
    path("<str:username>", views.ProfileView.as_view(), name="profile"),
]
