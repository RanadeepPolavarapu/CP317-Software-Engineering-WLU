from django.db import models

# Create your models here.

class Recipe(models.Model):
	title = models.CharField(max_length=50)
	summary = models.CharField(max_length=500, blank=True)
	description = models.TextField(blank=True)
	slug = models.SlugField(unique=True, max_length=50, null=False, blank=False)
	prep_time = models.CharField(max_length=100, blank=True) # This field type is a guess.
	ctime = models.DateTimeField(auto_now_add=True)
	mtime = models.DateTimeField(auto_now=True)
	sources = models.ManyToManyField(Source, blank=True)
	category = models.ForeignKey(Category)
	serving_string = models.ForeignKey(ServingString, null=True, blank=True)
	serving_value = models.IntegerField(null=True, blank=True)