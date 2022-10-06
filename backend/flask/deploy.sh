#!/bin/bash

sudo docker stop mountaindo_deploy_flask

sudo docker rm mountaindo_deploy_flask

sudo docker rmi mountaindo_deploy_flask

sudo docker build -t mountaindo_deploy_flask .

sudo docker run -d -p 5000:5000/tcp --name mountaindo_deploy_flask mountaindo_deploy_flask 

sudo docker logs -f mountaindo_deploy_flask
