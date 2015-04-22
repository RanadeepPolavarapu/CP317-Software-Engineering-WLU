from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

from chefshub import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'chefshub.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

	url(r'^$', views.index_home, name='index-home'),
    url(r'^(?i)admin/', include(admin.site.urls)),
    url(r'^(?i)api/', include('api.urls', namespace="api")),
)
