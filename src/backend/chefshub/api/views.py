from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.

def index(request):
	return HttpResponse("Welcome to the ChefsHub API. Detailed documentation on API routes coming soon :).")