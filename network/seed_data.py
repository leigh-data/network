import random
import datetime

from faker import Faker
from faker.providers import date_time, lorem 


from network.models import Post, User

faker = Faker()


def seed_data():
    for _ in range(5):
        username = faker.simple_profile()['username']
        user = User.objects.create(username=username)

        for _ in range(5):
            user.posts.create(content=faker.text(126), date_created=faker.date_between(start_date='-30d', end_date='now'))
