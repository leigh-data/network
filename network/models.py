from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    follows = models.ManyToManyField(
        'self',
        related_name='followed_by',
        symmetrical=False
    )

    def is_followed_by(self):
        return self.followed_by.count()


class Post(models.Model):
    content = models.CharField(max_length=126)
    author = models.ForeignKey("network.User", on_delete=models.CASCADE, related_name="posts")
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_created',)
    
    def __str__(self):
        return self.content[:25] + '...'
    
