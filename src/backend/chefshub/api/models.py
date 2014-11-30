from django.db import models

from django.contrib.auth.models import User

# Create your models here.

import uuid
import os

def get_file_path(instance, filename):
	ext = filename.split('.')[-1]
	filename = "%s.%s" % (uuid.uuid4(), ext)
	return os.path.join('uploads/logos', filename)

class Recipe(models.Model):
	id = models.AutoField(primary_key=True)
	recipe_name = models.CharField(max_length=50)
	summary = models.CharField(max_length=500, blank=True)
	description = models.TextField(blank=True)
	slug = models.SlugField(unique=True, max_length=50, null=False, blank=False)
	prep_time = models.CharField(max_length=100, blank=True) # This field type is a guess.
	
	sources = models.ManyToManyField(Source, blank=True)
	serving_string = models.ForeignKey(ServingString, null=True, blank=True)
	serving_value = models.IntegerField(null=True, blank=True)
	
	photo = models.ImageField(upload_to=get_file_path,
                        null=True,
                        blank=True,
                        verbose_name="the Recipe's image")
	
	meta_last_modified = models.DateTimeField(auto_now=True)
	meta_date_created = models.DateTimeField(auto_now_add=True)
	
	user = models.ForeignKey(User, verbose_name="the owner of this recipe", blank=True, null=True, on_delete=models.CASCADE)

	
	def __unicode__(self):
		return self.title