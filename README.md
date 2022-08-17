## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A PostgreSQL database.

### 1.2 Project configuration

Start by installing all the dependencies of the project.

```sh
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
.env
```


### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh

# Launch the development server with TSNode
npm run dev
```

You can now head to `http://localhost:4000/docs` and see your API Swagger docs. The example passenger API is located at the `http://localhost:4000/api/v1/passengers` endpoint.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── migrations/  # TypeORM migrations created using "npm run migration:create"
├── modules
│   ├── app.module.ts
│   ├── common/  # The common module contains pipes, guards, service and provider used in the whole application
│   ├── passenger/  # A module example that manages "passenger" resources
│   │   ├── controller/
│   │   │   └── passenger.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── passenger.pipe.ts
│   │   ├── model/
│   │   │   ├── passenger.data.ts  # The model that will be returned in the response
│   │   │   ├── passenger.entity.ts  # The actual TypeORM entity
│   │   │   └── passenger.input.ts  # The model that is used in the request
│   │   ├── passenger.module.ts
│   │   ├── service/
│   │   │   └── passenger.service.ts
│   │   └── spec/
│   └── tokens.ts
└── server.ts
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh

# Run the application using "ts-node"
npm run dev

```
