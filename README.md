# Customer Management Application

Simple Customer Management Application using PostgreSQL, Spring Boot and React that can be run locally
or deployed to your cloud environment.

## Prerequisites

To start developing, you have to install the following prerequisites on your machine:

* To build and run the frontend, you need Node.js and npm installed. For development, Node.js v24.14.1 was used.
* To work on the backend and to build your application for cloud development, you need a Java SDK in version 25. <br>
  Make sure it is compatible to your cloud runtime if you deploy to the cloud.
* For local development with docker-compose you need a local docker runtime. For development, podman was used.

## Used Technologies and Plugins

The following tools are used in the React frontend:

* Build and local development support: Vite
* Styling: TailwindCSS
* Linting: eslint with standard recommendations
* Formatting: prettier

And for the backend:

* Build: Maven
* Local development: docker-compose
* Database migration support: flyway
* Formatting: google-java-format intelliJ plugin with Default Google Java style profile

The following Spring Boot plugins are used:

* spring-boot-starter-webmvc: REST API support
* spring-boot-starter-data-jpa: JPA support
* spring-boot-starter-actuator: Support for Liveness / Readiness probe
* spring-boot-starter-flyway: Flyway DB migration support
* springdoc-openapi-starter-webmvc-ui: Automatically generating Swagger/OpenAPI documentation and serving it
* spring-boot-testcontainers: Using Testcontainers framework for integration testing
* rest-assured: Using REST Assured for API testing
* spring-boot-docker-compose: Support for local development with docker-compose
* spring-boot-devtools: Support for local development with automatic server restart after code changes

## Local Development

You can run the stack locally in docker-compose and using the Vite dev server.
When running the Spring Boot service directly from your IDE, make sure to add the environment flag

```bash
-Dspring.profiles.active=docker-compose
```

This flag ensures that the application configs for the docker-compose profile are used.
Combined with the spring-boot-docker-compose plugin you don't need to start up your docker-compose environment,
Spring Boot will handle it on application start.

Simply run the backend and DB from your IDE using docker-compose and then, in the interview-frontend directory run

```shell
$ npm run dev
```

The frontend uses server proxy configurations to not run into CORS problems when developing locally.
If you change your backend port in local development, adapt the configuration in interview-frontend/vite.config.ts

## Building for Cloud Deployment

If you want to deploy the application to your cloud environment, first adapt interview-frontend/.env

```bash
VITE_BACKEND_API_URL=<YOUR_CLOUD_BACKEND_URL_HERE>
```

Afterward simply run in the project root directory:

```bash
$ ./mvnw install
```

The install command automatically runs unit and integration tests and packages your JAR ready for deployment.
The build is using the com.github.eirslett:frontend-maven-plugin to build the React SPA and package it into the JAR.

## Deployment

Current setup can be deployed to AWS Elastic Beanstalk by just uploading the JAR to your beanstalk environment.
If you want to adapt that, check the application properties to change the DB config parameters.
Alternatively name your system environment parameters or DB connection as defined in the application properties.

If you deploy to AWS make sure your JAR is built with the AWS Corretto SDK (this version was built with v25.0.2-amzn)

## API Documentation

You can reach the automatically generated Swagger/OpenAPI documentation at <BACKEND_URL>/swagger-ui.html