# Online shop

## Parts of the application

Application has the following parts:
- nginx (for port forwarding and serving static files)
- nodejs/express server for the api
- react application for the building the static files
- docker for containerization of all parts
- some database in the future
- maybe a storage like `minio` in the future

## Running the project

For deployment on server cloning the repo and running `docker compose up -d` is quite enough.
For development:
- `npm start` in `frontend` directory for the react app
- `npm run dev` in `api` directory for the api
- `docker compose up` for nginx 

Note: each part of the project will have it's own **README.md**