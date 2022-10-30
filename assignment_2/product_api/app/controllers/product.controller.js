var ObjectId = require('mongoose').Types.ObjectId; 

const db = require("../models");
const Product = db.products;

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.updateQuantity = async (req, res) => {
  const productId = req.query.productId
  const quantity = req.query.quantity

  await Product.updateOne({productId: productId}, {$inc: {availableQuantity: -quantity}})

  res.send({msg: "Updated successfully!"})
}
