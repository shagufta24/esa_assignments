module.exports = (mongoose) => {
  const Product = mongoose.model(
    "products",
    mongoose.Schema(
      {
        productId: String,
        category: String,
        productName: String,
        productModel: String,
        price: Number,
        availableQuantity: Number,
      },
      { timestamps: true }
    )
  );

  return Product;
};
