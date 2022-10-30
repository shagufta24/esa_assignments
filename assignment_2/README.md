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

## API documentation

1. GET Product API: Exposed in the Product micro-service. Returns a list of all products that are applicable to a given user.
   <br>
   HTTP Method: GET<br>
   Request URI: /rest/v1/products<br>
   Query Parameters: NA<br>
   Request example: GET /rest/v1/products<br>
   Response example:

```
[
    {
        "productId": "12445dsd234",
        "category": "Modile",
        "productName": "Samsung",
        "productModel": "GalaxyNote",
        "price": 700
        "availableQuantity": 10
    },
    ...
]
```

2. PUT CartItem API: Exposed in the UserCart microservice. Used to create/update a product in user cart.<br>

   HTTP Method: PUT<br>
   Request URI: /rest/v1/users/<uuid>/cart <br>
   Body Parameter example:

```
{
    "productId": "12445dsd234",
    "quantity": 2
}
```

Request example: PUT /rest/v1/users/shagufta/cart
Response example:

```
{
    "productId": "12445dsd234",
    "productName": "Samsung",
    "quantity": 2
    "amount": 1400
}
```

3. Retrieve UserCart API: Exposed in the UserCart micro-service. Returns all available products in the cart for given user.
   <br>
   HTTP Method: GET<br>
   Request URI: /rest/v1/users/<uuid>/cart<br>
   Request example: GET /rest/v1/users/shagufta/cart <br>
   Response example:

```
{
    "uuid": "qa-test-user",
    "cart": [{
    "productId": "12445dsd234",
    "productName": "Samsung",
    "quantity": 2
    "amount": 1400,
    }
    ...
    ]
}
```

## Setting up

First, download or Fork+Clone this repository locally.

The node.js code runs in integration with a mongodb atlas server. Go to https://www.mongodb.com/cloud/atlas to create your own database in an atlas server. Copy the connection string.

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

Lastly, in the product_api and user_cart_api folders, run the following command to install all node.js dependencies:

```
npm install
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
