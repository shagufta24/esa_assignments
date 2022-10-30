const { updateQuantity } = require("../lib/productApi");
const db = require("../models");
const {
  userValidation,
  productValidation,
} = require("../validation/basicValidation");
const CartItem = db.cartItem;

exports.createCart = async (req, res) => {
  const user = req.params.user;

  const uv = userValidation(user);

  if (!uv) {
    res.status(401).send({ err: "User validation failed!" });
    return;
  }

  const cartItem = req.body;
  const currentCart = await CartItem.find({ user: user });

  const pv = await productValidation(cartItem);

  if (!pv) {
    res.status(500).send({ err: "Product validation failed!" });
    return;
  }

  let dbObj = { ...cartItem, user: user };
  // console.log("DBOBJ: ", dbObj);
  if (currentCart.find((entry) => entry.productId === cartItem.productId)) {
    console.log("Item exists in cart already, increasing quantity");
    await CartItem.updateOne(
      { productId: cartItem.productId },
      { $inc: { quantity: cartItem.quantity } }
    );
  } else {
    await CartItem.create(dbObj);
  }
  await updateQuantity(cartItem.productId, cartItem.quantity);

  res.send({ msg: "Successfully added cart items" });
};

exports.retrieveCart = async (req, res) => {
  const user = req.params.user;

  const uv = await userValidation(user);
  // console.log("UV: ", uv);

  if (!uv) {
    res.status(401).send({ err: "User validation failed!" });
    return;
  }

  const userCart = await CartItem.find({ user: user });

  res.send(userCart);
};
