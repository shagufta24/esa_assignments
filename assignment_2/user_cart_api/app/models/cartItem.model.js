module.exports = (mongoose) => {
    const CartItem = mongoose.model(
      "cartItem",
      mongoose.Schema(
        {
          productId: String,
          quantity: Number,
          userId: String
        },
        { timestamps: true }
      )
    );
  
    return CartItem;
  };
  