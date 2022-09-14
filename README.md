# Blockcent REST API Code

## Build & Run

1. Using Docker and docker-compose:

    ``` shell
    docker compose up -d
    ```

    **Don't forget** to execute `docker compose down` after you're done with the
    service. The container is restarted the next time the services are brought
    up and any code changes won't be reflected until the image is rebuilt with
    `docker compose up -d` or `docker compose build`

2. Local Install:

    ``` shell
    npm install
    npm start
    ```

## Tech Stack

- Express.js
- Node.js
- Docker

## Specification

The API is based on OpenAPI 3.0 spec

## Directory Structure

Logic is divided into 3 folders:

- `api` for api related code
- `services` to handle actual business logic
- `test` for testing code
- `app.js` is the entrypoint into the program

The API is component based so we have a folder dedicated to each component
handled by the API. E.g.: User, Product, etc.

Each component has a dedicated route and controller which are used by the top-level
`routes.js` file. This enables flexibility in the implementation.

Data Flow:
>  
> ```app.js -> server.js -> routes.js```
>  
> ```routes.js -> <component>/(route.js -> controller.js)```
>  
> ```controller.js -> <service>/```
