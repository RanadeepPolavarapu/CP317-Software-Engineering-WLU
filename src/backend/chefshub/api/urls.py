from django.conf.urls import patterns, url

from api import views

urlpatterns = patterns('',
	# ex: /summoner/
	url(r'^$', views.index, name='index'),
	
	url(r'^auth/user/login.json/?$', views.ajax_auth_login),
	url(r'^auth/user/register.json/?$', views.ajax_auth_register),
	url(r'^auth/user/is_authenticated.json/?$', views.ajax_auth_is_authenticated),
	
	url(r'^recipe/get_recent.json/?$', views.ajax_get_recent_recipes),

#     url(r'^ajax/update.json/?$', views.ajax_update_official_api),
# 	url(r'^ajax/register.json/?$', views.ajax_register_official_api),
# 	# Debug purposes.
# 	url(r'^debug/ajax/update.json/?$', views.debug_ajax_update),
# 	url(r'^debug/ajax/summoner/?$', views.debug_ajax_summoner),
# 	url(r'^debug/ajax/leagues/?$', views.debug_ajax_leagues),
# 	url(r'^debug/ajax/game/?$', views.debug_ajax_game),
# 	url(r'^debug/ajax/team/?$', views.debug_ajax_team),
# 	# Get more games JSON route.
# 	url(r'^ajax/matches.json/?$', views.ajax_get_more_matches),
#     url(r'^(?P<region>\w+)/(?P<summoner_name_or_id>[\w\ +]+)/?$', views.summoner_profile_page, name='summoner'),
)