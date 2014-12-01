from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files import File

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from api.models import *

import requests, urllib

# Create your views here.

def index(request):
	return HttpResponse("Welcome to the ChefsHub API. Detailed documentation on API routes coming soon :).")

@csrf_exempt
def ajax_auth_login(request):
	if request.method == 'POST':
		username = request.POST.get('username', '').strip()
		password = request.POST.get('password', '').strip()
		if username and password:
			# Test username/password combination
			user = authenticate(username=username, password=password)
			# Found a match
			if user is not None:
				# User is active
				if user.is_active:
					# Officially log the user in
					login(request, user)
					data = {'success': True, 'data': {'username': username, 'password': password, 'message': 'Successfully authenticated'} }
				else:
					data = {'success': False, 'error': True, 'errormsg': 'User is not active'}
			else:
				data = {'success': False, 'error': True, 'errormsg': 'Wrong username and/or password'}

			return JsonResponse(data, safe=False)
	elif request.method == 'GET':
		username = request.GET.get('username', '').strip()
		password = request.GET.get('password', '').strip()
		if username and password:
			# Test username/password combination
			user = authenticate(username=username, password=password)
			# Found a match
			if user is not None:
				# User is active
				if user.is_active:
					# Officially log the user in
					login(request, user)
					data = {'success': True, 'data': {'username': username, 'password': password, 'message': 'Successfully authenticated'} }
				else:
					data = {'success': False, 'error': True, 'errormsg': 'User is not active'}
			else:
				data = {'success': False, 'error': True, 'errormsg': 'Wrong username and/or password'}

			return JsonResponse(data, safe=False)

	# Request method is not GET or POST but another HTTP method or one of username or password is missing
	return JsonResponse( {'success': False, 'error': True, 'errormsg': 'Invalid HTTP Method or params are missing.'} , safe=False)

@csrf_exempt
def ajax_auth_register(request):
	if request.method == 'POST':
		username = request.POST.get('username', '').strip()
		password = request.POST.get('password', '').strip()
		email = request.POST.get('email', '').strip()
		first_name = request.POST.get('first_name', '').strip()
		last_name = request.POST.get('last_name', '').strip()
		try:
			user = User.objects.create_user(username, email, password)
			user.first_name = first_name
			user.last_name = last_name
			user.save()
			
			ch_user = CHUser(id=user.id, user=user)
			ch_user.save()
			
			result = {}
			for field in user._meta.fields:
				result[field.name] = field.value_from_object(user)
			data = {'success': True, 'data': result }
		except Exception as e:
			data = {'success': False, 'error': True, 'errormsg': str(e) }
		
		return JsonResponse(data, safe=False)
	elif request.method == 'GET':
		username = request.GET.get('username', '').strip()
		password = request.GET.get('password', '').strip()
		email = request.GET.get('email', '').strip()
		first_name = request.GET.get('first_name', '').strip()
		last_name = request.GET.get('last_name', '').strip()
		try:
			user = User.objects.create_user(username, email, password)
			user.first_name = first_name
			user.last_name = last_name
			user.save()
			
			ch_user = CHUser(id=user.id, user=user)
			ch_user.save()
			
			result = {}
			for field in user._meta.fields:
				result[field.name] = field.value_from_object(user)
			data = {'success': True, 'data': result }
		except Exception as e:
			data = {'success': False, 'error': True, 'errormsg': str(e) }
		
		return JsonResponse(data, safe=False)
		
	# Request method is not GET or POST but another HTTP method or one of username or password is missing
	return JsonResponse( {'success': False, 'error': True, 'errormsg': 'Invalid HTTP Method or params are missing.'} , safe=False)

@csrf_exempt
def ajax_auth_is_authenticated(request):
	if request.user.is_authenticated():
		result = {}
		for field in request.user._meta.fields:
			result[field.name] = field.value_from_object(request.user)
		return JsonResponse( {'success': True, 'data': {'is_authenticated': True, 'user_data': result}} , safe=False)
	else:
		return JsonResponse( {'success': False, 'data': {'is_authenticated': False}} , safe=False)

@csrf_exempt
def ajax_auth_logout(request):
	logout(request)
	return JsonResponse( {'success': False, 'data': {'is_authenticated': False}} , safe=False)

@csrf_exempt
def ajax_get_recent_recipes(request):
	list = Recipe.objects.all().order_by('-id')[:100]
	data = {'success': True, 'data': []}
	for item in list:
		result = {}
		for field in item._meta.fields:
			result[field.name] = field.value_from_object(item)
		result['owner'] = User.objects.get(pk=int(result['user'])).username
		result['photo'] = str(result['photo'])
		data['data'].append(result)
	return JsonResponse(data, safe=False)

@csrf_exempt
def ajax_search_recipes(request):
	if request.method == 'POST':
		search_query = request.POST.get('q', '').strip()
		list = Recipe.objects.filter(recipe_name__icontains=search_query)
		data = {'success': True, 'data': []}
		for item in list:
			result = {}
			for field in item._meta.fields:
				result[field.name] = field.value_from_object(item)
			result['owner'] = User.objects.get(pk=int(result['user'])).username
			result['photo'] = str(result['photo'])
			data['data'].append(result)
		return JsonResponse(data, safe=False)
	elif request.method == 'GET':
		search_query = request.GET.get('q', '').strip()
		list = Recipe.objects.filter(recipe_name__icontains=search_query)
		data = {'success': True, 'data': []}
		for item in list:
			result = {}
			for field in item._meta.fields:
				result[field.name] = field.value_from_object(item)
			result['owner'] = User.objects.get(pk=int(result['user'])).username
			result['photo'] = str(result['photo'])
			data['data'].append(result)
		return JsonResponse(data, safe=False)

@csrf_exempt
def ajax_get_statistics(request):
	total_recipes = Recipe.objects.count()
	total_users = User.objects.count()
	total_chusers = CHUser.objects.count()
	data = {'success': True, 'data': {}}
	data['data'] = {'Recipe': total_recipes, 'CHUser': total_chusers, 'User': total_users}
	return JsonResponse(data, safe=False)

@csrf_exempt
def ajax_create_recipe(request):
	if request.method == 'POST' and request.user.is_authenticated():
		data = {'success': True, 'data': {}}

		recipe_name = request.POST.get('recipe_name', '').strip()
		photo = request.FILES['photo'] if request.FILES else None
		photo_url = request.POST.get('photo_url', '').strip()
		description = request.POST.get('description', '').strip()
		ingredients = request.POST.get('ingredients', '').strip()
		directions = request.POST.get('directions', '').strip()
		prep_time = request.POST.get('prep_time', '').strip()
		cook_time = request.POST.get('cook_time', '').strip()
		serving_value = request.POST.get('serving_value', '').strip()
		rating = request.POST.get('rating', '').strip()
		difficulty = request.POST.get('difficulty', '').strip()
		cuisine_type = request.POST.get('cuisine_type', '').strip()
		user = request.user
		try:
			recipe = Recipe(
				recipe_name=recipe_name,
				photo=photo,
				photo_url=photo_url,
				description=description,
				ingredients=ingredients,
				directions=directions,
				prep_time=prep_time,
				cook_time=cook_time,
				serving_value=serving_value,
				rating=rating,
				difficulty=difficulty,
				cuisine_type=cuisine_type,
				user=user
			)
				
			recipe.save()
			
			result = {}
			for field in recipe._meta.fields:
				result[field.name] = field.value_from_object(recipe)
			result['photo'] = str(result['photo'])
			data = {'success': True, 'data': result }
		except Exception as e:
			raise
			data = {'success': False, 'error': True, 'errormsg': str(e) }
		
		return JsonResponse(data, safe=False)
		
	# Request method is not GET or POST but another HTTP method or one of username or password is missing
	return JsonResponse( {'success': False, 'error': True, 'errormsg': 'Invalid HTTP Method or params are missing.'} , safe=False)

@csrf_exempt
def ajax_convert_photoURL_to_ImageField(request):
	list = Recipe.objects.all().order_by('-id')[:100]
	for recipe in list:
		if recipe.photo_url is '' or recipe.photo:
			continue
			
		photo_request = urllib.request.urlretrieve(recipe.photo_url)
		recipe.photo.save(os.path.basename(recipe.photo_url), File(open(photo_request[0], 'rb')))
		recipe.save()
	data = {'success': True, 'data': {'photo_urls': 'Converted to ImageField'}}
	return JsonResponse(data, safe=False)
			
	