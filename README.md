# Getir Backend Assignment


The Challenge
We’d like you to create a RESTful API with a single endpoint that fetches the data in the
provided MongoDB collection and return the results in the requested format.

## Requirements
   -  The code should be written in Node.js using express framework
   - The endpoint should just handle HTTP POST requests.
   - The application should be deployed on AWS or Heroku. You don’t need to use any
   API Gateway, Load Balancers or any other layer than the developed application.
   - The up to date repo should be publicly available in Github, Bitbucket or equivalent.

## For more Requirements
  - Please find attached pdf.

## Setup & Installation
To create a project, simply run:

```bash
git clone {repo}
cd {repo dir}
yarn
yarn dev
```


Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
//Have udpated .env.example.
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=5000

# URL of the Mongo DB
MONGODB_URL=mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```


### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/getir/getRecords` - Returns all the records in mongo based on the filter input provided

```json
 	{
        "startDate": "2017-01-26",
        "endDate": "2018-02-02",
        "minCount": 27,
        "maxCount": 170
  	}
```
## Deployed Api URL on Heroku
```bash
https://warm-taiga-95023.herokuapp.com/v1/getir/getRecords
```

## Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "msg": "Not found",
  "records": []
}
```

