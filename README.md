# Network

[GitHub](https://google.com)
[YouTube](https://google.com)
[Heroku](https://google.com)

---

This app displays small (maximum 126 characters) plain-text blog posts in Bootstrap cards. The top of the post has the post's author's username, which links to the author's profile page. At the bottom of the card is a heart icon, followed by the number. If an authenticated user liked a post, the heart is colored red, and the number updates accordingly.  If a user authored the post, he or she has the option to edit the post. The form is concealed/revealed when the edit button is clicked. Each card is paginated by 10 posts, with  **prev** and **next** links as necessary. 

There are three pages other than authentication pages: the main page, profile page, and the following page. The main page contains posts from all users, with the newest at the top. The profile page contains all posts from a particular user, also with the newest post at the top. At the top of the page is the user's name, the number of followers, and the number of users that user follows. Authenticated users have the option to click the follow button to follow a user, and an unfollow button if the user is followed. The following page allows an authenticated user to view all of the posts from all of the users a logged-in user follows.

---

## Environment Variables

The base directory need to have an **.env** file or have the following environment variables to work properly, with the minimum of these settings:

| Name | Description |
|------| ------------|
|DEBUG | If true, web project is running in debug mode.
|SECRET_KEY| A string of characters used for securing signed data|
|DATABASE_URL| The URL for the database. For development, `sqlite:///.db` can be used for SQLite.
|ALLOWED HOSTS|A comma-delimited list of hosts allowed to run site.

The project uses [django-environ](https://django-environ.readthedocs.io/en/latest/) to handle environment variables and settings.


---

## The Base Directory

### .gitignore
A file to direct git to ignore files and directories.

### runtime.txt
Specifies the Python runtime for the project.

### requirements.txt
The packages required to run the project.

### Procfile
Scripts run by Heroku to run the project on the platform.

### manage.py
Django task runner.

### project4/

Directory that contains the main **Django** files.

#### asgi.py
The main ASGI file.

#### settings.py
The main settings file.

#### urls.py
The main url file.

#### wsgi.py
The main WSGI file.

### network/

The main app of the project.

#### static/
Directory holding the static (i.e. css and JavaScript) files. The files are contained in the subdirectory **network**

##### network/index.js
The main JavaScript file. Executes all of the actions that do not require a page refresh.

##### network/styles.css
The main stylesheet of the project. It is in **css** and not **scss** as there are only a handful of styles.

#### templates/
Directory holding all of the **HTML** templates. The files are contained in the subdirectory **network**, with the exception of **404.html**, and **500.html**.

#### 404.html
Page Not Found page.

#### 500.html
Server Error page.

##### network/following.html
The following page template.

##### network/index.html
The main page template.

##### network/login.html
The login page template.

##### network/layout.html
The base layout template.

##### network/post_display.html
The subpage template that displays the post cards, and if necessary, page (**prev** and **next**) links.

##### network/register.html
The registration page template.

#### migrations/

Folder holding the migrations for the app. The framework generates the migration files.

#### admin.py
File for handling how the admin works with Post models.

#### apps.py

File used to install the app.

#### models.py

The app's database models.

#### urls.py
The urls belonging to the app.

#### views.py
The views that belong to the app. Aside from the views that came with the boilerplate project, the views are exclusively class-based views. There is also a ModelForm used for new Post creation and a helper for paginating posts.


#### urls.py
the app's urls.

#### tests.py
Contains tests related to the project.
