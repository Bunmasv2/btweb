const Product = require('../model/product');



// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, image } = req.body;

        // Validation
        if (!name || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: 'Tên, giá, danh mục và ảnh là bắt buộc'
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
            message: 'Thêm sản phẩm thành công',
            data: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi thêm sản phẩm',
            error: error.message
        });
    }
};

// Sửa sản phẩm
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, stock, image } = req.body;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (stock !== undefined) updateData.stock = stock;
        if (image !== undefined) updateData.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật sản phẩm',
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
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm thành công',
            data: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa sản phẩm',
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
            message: 'Lỗi khi lấy danh sách sản phẩm',
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
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin sản phẩm',
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