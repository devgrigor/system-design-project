# Online shop

## Parts of the application

Application has the following parts:

-   nginx (for port forwarding and load balancing and serving static files)
-   nodejs/express server for the api
-   react application for the building the static files
-   docker for containerization of all parts
-   some database in the future
-   maybe a storage like `minio` in the future

## Running the project

For deployment on server cloning the repo and running `docker compose up -d` is quite enough.
For development:

-   `docker compose up` for starting all containers. This starts api and runs nginx for the build of the website

Note: each part of the project will have it's own **README.md**

### For testing check following urls

-   http://localhost:8080 for the website
-   http://localhost:8000 for the api requests
-   http://localhost:8500 for swagger ui of api documentation
-   http://localhost:8080/balance-api for the load balancer of api
