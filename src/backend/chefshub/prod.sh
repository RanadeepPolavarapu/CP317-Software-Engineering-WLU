#!/usr/bin/env bash

nohup gunicorn chefshub.wsgi:application --bind localhost:8001 >/dev/null 2>&1 &
