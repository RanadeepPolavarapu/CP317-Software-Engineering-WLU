from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

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
			result = {}
			for field in user._meta.fields:
				result[field.name] = field.value_to_string(user)
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
			result = {}
			for field in user._meta.fields:
				result[field.name] = field.value_to_string(user)
			data = {'success': True, 'data': result }
		except Exception as e:
			data = {'success': False, 'error': True, 'errormsg': str(e) }
		
		return JsonResponse(data, safe=False)
		
	# Request method is not GET or POST but another HTTP method or one of username or password is missing
	return JsonResponse( {'success': False, 'error': True, 'errormsg': 'Invalid HTTP Method or params are missing.'} , safe=False)

@csrf_exempt
def ajax_auth_is_authenticated(request):
	if request.user.is_authenticated():
		print(request.user.id)
		result = {}
		for field in request.user._meta.fields:
			result[field.name] = field.value_to_string(request.user)
		return JsonResponse( {'success': True, 'data': {'is_authenticated': True, 'user_data': result}} , safe=False)
	else:
		return JsonResponse( {'success': True, 'data': {'is_authenticated': False}} , safe=False)

