const express = require("express")
const { getProducts, addProduct, deleteProduct, updateProduct, getProductById } = require("../controller/productController")
const productsRoute = express.Router()

productsRoute.get(`/`, getProducts)
productsRoute.post(`/`, addProduct)
productsRoute.delete(`/:id`, deleteProduct)
productsRoute.put(`/:id`, updateProduct)
productsRoute.get(`/detail/:id`, getProductById)

module.exports = productsRoute