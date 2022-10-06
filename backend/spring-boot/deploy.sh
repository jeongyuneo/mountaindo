#!/bin/bash

./gradlew build

sudo docker stop mountaindo_deploy_spring

sudo docker rm mountaindo_deploy_spring

sudo docker rmi mountaindo_deploy_spring

sudo docker build -t mountaindo_deploy_spring .

sudo docker run -d -p 8080:8080 --name mountaindo_deploy_spring -v /home/ubuntu/img:/home/ mountaindo_deploy_spring

sudo docker logs -f mountaindo_deploy_spring