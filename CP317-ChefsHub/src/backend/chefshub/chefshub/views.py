from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.

def index_home(request):
	return redirect('/api/', permanent=True)