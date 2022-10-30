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
  // console.log("user: ", foundUser)

  if (!foundUser) return false;
  return true;
};

exports.productValidation = async (cartItem) => {
  const productList = (await getAllProducts()).data;

  // Validate item ids

  if (
    productList.findIndex((item) => item.productId === cartItem.productId) ===
    -1
  )
    return false;

  // Validate quantity

  const productEntry = productList.find(
    (item) => item.productId === cartItem.productId
  );
  if (productEntry.availableQuantity < cartItem.quantity) return false;

  return true;
};
