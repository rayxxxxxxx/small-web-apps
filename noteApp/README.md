# NodeJS + Express simple note taking app

Home page: http://localhost:7001/home

- Run with `docker compose`
- Need to create `volume` named *mongodb-volume*
- Need to create bridge `network` named *note-app-network*

### Issues

- `CORS` error on fetching from API, except `GET` method

### shell commands:

Run mongodb container

> docker run -dit -v mongodb-volume:/data/db -p 27017:27017 --rm --network note-app-network --name mongodb mongo:4.2 mongod

Build and run API container (in backend directory)

> docker image build --tag note-app-api-img .  
> docker run -dit -p 7000:7000 --rm --network note-app-network --name api note-app-api-img  

Build and run UI container (in frontend directory)

> docker image build --tag note-app-ui-img .  
> docker run -dit -p 7001:7001 --rm --network note-app-network --name ui note-app-ui-img  

Restart docker compose

> docker compose down -t 0  
> docker image rm noteapp-api:latest noteapp-ui:latest  
> docker compose build  
> docker compose up -d  
