module.exports = (mongoose) => {
    const CartItem = mongoose.model(
      "cartItem",
      mongoose.Schema(
        {
          productId: String,
          quantity: Number,
          user: String
        },
        { timestamps: true }
      )
    );
  
    return CartItem;
  };
  