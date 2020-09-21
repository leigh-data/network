from django.forms import ModelForm, Textarea
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View

from .models import User, Post


class PostForm(ModelForm):
    """ModelForm for adding a Post."""
    class Meta:
        model = Post
        fields = ('content',)
        widgets = {'content': Textarea()}


def paginate(post_list, page):
    """Helper function to paginate posts."""
    paginator = Paginator(post_list, 10)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    
    return posts


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


class IndexView(View):
    form_class = PostForm

    def get(self, request, *args, **kwargs):
        post_list = Post.objects.all()
        page = request.GET.get('page', 1)
        posts = paginate(post_list, page)

        # form
        if request.user.is_authenticated:
            form = self.form_class()
        else:
            form = None

        context = {'posts': posts, 'form': form}
        return render(request, "network/index.html", context)
    
    @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            form.instance.author = request.user
            form.save()
            return HttpResponseRedirect('/')
        
        # if failure
        post_list = Post.objects.all()
        page = request.GET.get('page', 1)
        posts = paginate(post_list, page)
        context = {'posts': posts, 'form': form}
        return render(request, "network/index.html", context)


class ProfileView(View):
    def get(self, request, username, *args, **kwargs):
        profile_user = User.objects.get(username=username)
        post_list = profile_user.posts.all()
        page = request.GET.get('page', 1)
        posts = paginate(post_list, page)
        
        context = {'profile_user': profile_user,'posts': posts}
        return render(request, "network/profile.html", context)


class FollowingView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        user = request.user
        page = request.GET.get('page', 1)
        follows = user.follows.all()
        post_list = Post.objects.filter(author__in=follows)
        posts = paginate(post_list, page)
        
        context = {'posts': posts}
        return render(request, "network/following.html", context)
