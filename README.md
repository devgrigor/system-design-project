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

# ````````````````````````````````````````````

# Architecture

High level diagram of the architecture of the system:

![Alt text](architecture_diagram.jpg?raw=true 'Title')

NOTE: Each line of docker is a service/container and can be deployed on a separate server.

## API

Basic server with nodejs and typescript. Express framework. 3rd party libraries are used for connecting the code to other services like database and cache.

## Databases

2 kinds of databases are used. SQL: MySQL db for user information and NoSQL: redis for saving the products, also considering the speed of this db is also used as cache solution. Major tradeoff here based on searching of the products, since the `key-value` db is not exactly most flexible one.

## Serving the static files

Nginx is used to serve the web page where user can do the ordering. The web page sends all requests to the API. The same nginx is also used as a port forwarding for api and by extension is also load balancer. At the moment is configured for 2 running api instances, but any amount of those can be added at any time. The algorithm is simplistic Rounded Robin.

## Aftermath

The main thing I would do differently is replace product information database with any other, since redis works only on cache and although the speed of returning single product is amazing, but searching through products or keeping too many of those only in RAM is not cheap. The accessability of api depends on nginx (load balancer), but if we talk about the api itself even if one instance is up and not overloaded it will give response. Accessability of website can be improved via another load balancer and deployment of the static files to different hosts. In matter of consistency the system doesn't have good handling mechanism for that, so if the product amount is limited and 2 users order last one, both of the requests will go through. I would solve this with message queue mechanism that would check if the product is available and not let simultaneous processing of same product. Scalability is horizontal since every instance can work completely separate, which means that just by adding another api instance on separate host we increase the system capacity without redesigning anything. Same goes for website. The database scalability does not tell the same story, because if another instance is added we need some kind of sharding mechanism to handle which part of data goes where, so redesigning of the db will be necessary.
Also for search of the products I would love to have separate search engine like Sphynx or ElasticSearch.
