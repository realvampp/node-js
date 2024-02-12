## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

You need to define your `.env` file before. To see variables you need check `db/data-source.ts` and `s3.service.ts`
where you should find it like `process.env.*`<br>
Now you can run following commands and go to the http://localhost:3000/api/swagger.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
