# Generated by Django 3.1.1 on 2020-09-22 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_user_follows'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='likes',
            field=models.ManyToManyField(related_name='liked_by', to='network.Post'),
        ),
    ]