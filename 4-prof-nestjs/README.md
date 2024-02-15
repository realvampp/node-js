## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# copy .env file and install all dependencies
$ make pre-install

# up docker container
$ make docker-up

# run database migrations
$ npm run migration:run

# seed database
$ npm run seed:run
```

## Running the app

Now you can run following commands and go to the http://localhost:3000/api/swagger.

```bash
# run the docker containers with MySQL and Adminer
$ make docker-up

# watch mode
$ npm run start:dev
```
