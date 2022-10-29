# ESA Assignment 2

## Summary

Writing backend services for a simple online shopping cart platform using microservices linked via API calls.

Major roles: Products available to shop, User interacting with the microservices.

This project has two microservices:

1. Product microservice: Has 1 API to retrieve a list of products available.
2. User Cart microservice: Has 2 APIs - to add/update cart items and to retrieve all cart items.

## Basic api structure

```
~esa-assignments/assignment2>tree
..
├── product_api
│   ├── app
│   │   ├── config
│   │   │   └── db.config.js
│   │   ├── controllers
│   │   │   └── product.controller.js
│   │   ├── model
│   │   │   └── product.model.js
|   |   |   └── index.js
│   │   └── routes
│   │       └── product.routes.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── server.js
├── user_api
│   ├── app
│   │   ├── config
│   │   │   └── db.config.js
│   │   ├── controllers
│   │   │   └── cart.controller.js
│   │   ├── model
│   │   │   ├── cartItem.model.js
│   │   │   ├── user.model.js
│   │   │   └── index.js
│   │   ├── routes
│   │   |   └── cartItem.routes.js
│   │   └── validation
│   │       └── basicValidation.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
|   ├── .env
│   ├── .gitignore
│   └── server.js
└── README.md

```

DATABASES:<br>

1. products<br>
2. cart items<br>

server.js file in each microservice to run the server.

## Setting up

Download or Fork+Clone this repository.

The node.js code is designed to run in integration with a mongodb atlas server. Create your own database in the atlas server and copy the connection string.

In the product_api folder, create a .env file and add the following lines:<br>

```
DATABASE_URL=<your mongodb atlas database connection string>
PORT=<port number for product api server>
```

In the user_cart_api folder, create a .env file and add the following lines:<br>

```
DATABASE_URL=<your mongodb atlas database connection string>
PORT=<port number for user cart api server>
PRODUCT_API_URL=http://localhost:<port number for product api server>/rest/v1
```

### Run servers

Inside the product_api or user_cart_api folder, run the following command to execute the server.js file:

```
npm start
```

Output :

```
> product_api@1.0.0 start
> nodemon server.js

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
product_api RESTful API server started on: 8080

```

## Validation

## Built With

- [Node.Js](https://nodejs.org/en/) - Javascript runtime environment
- [Express.js](https://expressjs.com/) - Backend Web Framework
- [MongoDb Atlas](https://www.mongodb.com/cloud/atlas) - Database Management

## Author

**Shagufta Anjum**
