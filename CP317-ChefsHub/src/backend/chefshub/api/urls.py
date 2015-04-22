from django.conf.urls import patterns, url

from api import views

urlpatterns = patterns('',
	# ex: /summoner/
	url(r'^$', views.index, name='index'),
	
	url(r'^auth/user/login.json/?$', views.ajax_auth_login),
	url(r'^auth/user/register.json/?$', views.ajax_auth_register),
	url(r'^auth/user/is_authenticated.json/?$', views.ajax_auth_is_authenticated),
	url(r'^auth/user/logout.json/?$', views.ajax_auth_logout),

	url(r'^recipe/get_recent.json/?$', views.ajax_get_recent_recipes),
	url(r'^recipe/get_top_rated.json/?$', views.ajax_get_top_rated_recipes),
	url(r'^recipe/get_least_difficult.json/?$', views.ajax_get_least_difficult_recipes),
	url(r'^recipe/get_most_serving_value.json/?$', views.ajax_get_most_serving_recipes),
	url(r'^recipe/search.json/?$', views.ajax_search_recipes),
	url(r'^recipe/create_recipe.json/?$', views.ajax_create_recipe),
	url(r'^recipe/like_recipe.json/?$', views.ajax_like_recipe),
	url(r'^recipe/photourl_to_imagefield.json/?$', views.ajax_convert_photoURL_to_ImageField),
	url(r'^recipe/statistics.json/?$', views.ajax_get_statistics),
	
)