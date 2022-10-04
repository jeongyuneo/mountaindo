#!/bin/bash

./gradlew build

sudo docker cp mountaindo_deploy:/home/. ~/img

sudo docker stop mountaindo_deploy

sudo docker rm mountaindo_deploy

sudo docker rmi mountaindo_deploy

sudo docker build -t mountaindo_deploy .

sudo docker run -d -p 8080:8080 --name mountaindo_deploy mountaindo_deploy

sudo docker cp ~/img/. mountaindo_deploy:/home

sudo docker logs -f mountaindo_deploy