module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all products
  router.get("/products", products.findAll);

  // Update quantity 
  router.get("/updateQuantity", products.updateQuantity)

  app.use("/rest/v1", router);
};
