const { getAllProducts } = require("../lib/productApi");
const db = require("../models");
const User = db.user;

const HARDCODED_USER_LIST = [
  { username: "shagufta" },
  { username: "mec" },
  { username: "john" },
];

exports.userValidation = async (user) => {
  const foundUser = HARDCODED_USER_LIST.find(
    (entry) => entry.username === user
  );
  //   console.log("user: ", foundUser);

  if (!foundUser) return false;
  return true;
};

exports.productValidation = async (cartItems) => {
  const productList = (await getAllProducts()).data;

  // Validate item ids
  for (const cartItem of cartItems) {
    if (productList.findIndex((item) => item._id === cartItem.productId) === -1)
      return false;
  }

  // Validate quantity
  for (const cartItem of cartItems) {
    const productEntry = productList.find(
      (item) => item._id === cartItem.productId
    );
    if (productEntry.availableQuantity < cartItem.quantity) return false;
  }

  return true;
};
