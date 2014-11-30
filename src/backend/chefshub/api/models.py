from django.db import models

from django.contrib.auth.models import User

import uuid
import os
import time

# Create your models here.

class CHUser(models.Model):
	id = models.BigIntegerField(primary_key=True, db_index=True)
	user = models.ForeignKey(User, verbose_name="the User class of this CHUser", blank=True, null=True, on_delete=models.CASCADE)
	json_liked_recipes = models.TextField("Recipes liked (favourited) by this CHUser in JSON format", blank=True)
	json_recipe_rating = models.TextField("Recipes rated by this CHUser in JSON format", blank=True)
	meta_last_modified = models.DateTimeField(auto_now=True)
	meta_date_created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "CHUser: " + self.user.username
		
	class Meta:
		verbose_name = "CHUser"


def recipe_get_file_path(instance, filename):
	ext = filename.split('.')[-1]
	filename = "%s.%s" % (uuid.uuid4(), ext)
	return os.path.join(time.strftime('recipe/photo/%Y/%m/%d'), filename)

class Recipe(models.Model):
	id = models.AutoField(primary_key=True, db_index=True)
	recipe_name = models.CharField(max_length=150, db_index=True)
	photo = models.ImageField(upload_to=recipe_get_file_path,
						null=True,
						blank=True,
						verbose_name="the Recipe's image")
	
	photo_url = models.TextField("An external Recipe photo URL", blank=True)
	description = models.TextField(blank=True)
	ingredients = models.TextField(blank=True)
	directions = models.TextField(blank=True)
	prep_time = models.CharField(max_length=100, blank=True)
	cook_time = models.CharField(max_length=100, blank=True)
	serving_value = models.IntegerField(null=True, blank=True)
	rating = models.IntegerField(null=True, blank=True)
	difficulty = models.IntegerField(null=True, blank=True)
	cuisine_type = models.CharField(max_length=100, blank=True)
	
	user = models.ForeignKey(User, verbose_name="the owner of this recipe", blank=True, null=True, on_delete=models.CASCADE)
	
	meta_last_modified = models.DateTimeField(auto_now=True)
	meta_date_created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "Recipe: " + self.recipe_name
		
	class Meta:
		verbose_name = "Recipe"
		


