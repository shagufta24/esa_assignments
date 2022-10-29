const axios = require('axios')

const productClient = axios.create({
    baseURL: process.env.PRODUCT_API_URL,
    timeout: 1000,
  });


exports.getAllProducts = async () => {
    return await productClient.get("/products")
}

exports.updateQuantity = async (productId, quantity) => {
    return await productClient.get(`/updateQuantity?productId=${productId}&quantity=${quantity}`)
}