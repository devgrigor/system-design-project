# Online shop

## Parts of the application

Application has the following parts. Each of which is now separated to a single microservice i.e. docker container with separate `compose` file.

-   nginx (for port forwarding and load balancing and serving static files)
    This is for the web app also load balancing. `docker-compose.web-yml`
-   nodejs/express server for the api. `docker-compose.api.yml`

-   swagger documentation for the above api. Also separate docker file just for testing purposes `docker-compose.docs.yml`

-   Sql database for user data `docker-compose.db.yml`

-   NoSQL database: redis for product info. Also used as a cache `docker-compose.cache.yml`

## Running the project

For deployment on server cloning the repo and running `docker compose up -d` is quite enough.
For development:

-   `docker compose up -f docker-compose.${service}.yml` for starting each service separately.

Note: each part of the project can be fully separated to another repo and deployed in different environment. Slight additional configuration will be required in that case.

### For testing check following urls

-   http://localhost:8080 for the website
-   http://localhost:8000 for the api requests
-   http://localhost:8500 for swagger ui of api documentation
-   http://localhost:8080/balance-api for the load balancer of api
