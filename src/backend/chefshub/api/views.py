from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login


# Create your views here.

def index(request):
	return HttpResponse("Welcome to the ChefsHub API. Detailed documentation on API routes coming soon :).")

@csrf_exempt
def auth_ajax_login(request):
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
def auth_is_authenticated(request):
	if request.user.is_authenticated():
		return JsonResponse( {'success': True, 'data': {'is_authenticated': True}} , safe=False)
	else:
		return JsonResponse( {'success': True, 'data': {'is_authenticated': False}} , safe=False)