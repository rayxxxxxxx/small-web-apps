# Note taking app: ExpressJS + MongoDB + Handlebars + Docker

## Run

Create volume for mongodb

> docker volume create mongodb-volume

Create network for app

> docker network create --driver bridge note-app-network

Run app with docker-compose (may need build first)

> docker compose up --detach

Open browser and type http://localhost:7001/home

## Stop

> docker compose down --timeout 0

## Clean

> docker image rm noteapp-ui  
> docker image rm noteapp-api  
> docker network rm note-app-network  
> docker volume rm mongodb-volume

### Issues

`CORS` error on fetching from API, except `GET` method