const Product = require('../model/product');



// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, image } = req.body;

        // Validation
        if (!name || !price || !category || !image) {
            return res.status(400).json({
                success: false,
            });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock,
            image
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            data: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Sửa sản phẩm
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, stock, image } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
            });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
            });
        }

        res.status(200).json({
            success: true,
            data: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
};