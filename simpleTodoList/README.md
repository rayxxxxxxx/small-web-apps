# Simple todo-list web-app with ExpressJS, Express-Handlebars, sqlite3

## Run

Create volume for persistent data storage

> docker volume create todolist-volume

Create network for backend and frontend

> docker network create --driver bridge todolist-network

Start app with docker-compose

> docker compose up --detach

Open browser and type http://localhost:7001/home in search bar

## Stop

Stop app with docker-compose

> docker compose down --timeout 0

## Clean

> docker image rm simpletodolist-client simpletodolist-api  
> docker network rm todolist-network  
> docker volume rm todolist-volume