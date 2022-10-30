module.exports = (app) => {
    const cartItems = require("../controllers/cart.controller");
  
    var router = require("express").Router();
  
    // Add to cart
    router.put("/users/:user/cart", cartItems.createCart)

    // Get user cart
    router.get("/users/:user/cart", cartItems.retrieveCart)

    router.get("/hello", (req, res) => {
        res.send("hello")
    })
  
    app.use("/rest/v1", router);
  };
  