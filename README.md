## Aucto book backend

The backend uses the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
It also uses MongoDB dockerized for the DB.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# start the mongoDB docker
$ npm run mongo:start

# seed the DB
$ npm run db:seed

# start the server
$ npm run start

# in watch mode
$ npm run start:dev

# in production mode
$ npm run start:prod

# stop the mongoDB docker instance
$ npm run mongo:stop
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
