# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import api.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CHUser',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, db_index=True, serialize=False)),
                ('json_liked_recipes', models.TextField(blank=True, verbose_name='Recipes liked (favourited) by this CHUser in JSON format')),
                ('json_recipe_rating', models.TextField(blank=True, verbose_name='Recipes rated by this CHUser in JSON format')),
                ('meta_last_modified', models.DateTimeField(auto_now=True)),
                ('meta_date_created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True, verbose_name='the User class of this CHUser')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(primary_key=True, db_index=True, serialize=False)),
                ('recipe_name', models.CharField(max_length=150, db_index=True)),
                ('photo', models.ImageField(blank=True, upload_to=api.models.recipe_get_file_path, null=True, verbose_name="the Recipe's image")),
                ('photo_url', models.TextField(blank=True, verbose_name='An external Recipe photo URL')),
                ('description', models.TextField(blank=True)),
                ('ingredients', models.TextField(blank=True)),
                ('directions', models.TextField(blank=True)),
                ('prep_time', models.CharField(blank=True, max_length=100)),
                ('cook_time', models.CharField(blank=True, max_length=100)),
                ('serving_value', models.IntegerField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('difficulty', models.IntegerField(blank=True, null=True)),
                ('cuisine_type', models.CharField(blank=True, max_length=100)),
                ('meta_last_modified', models.DateTimeField(auto_now=True)),
                ('meta_date_created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True, verbose_name='the owner of this recipe')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
