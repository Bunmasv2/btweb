// Giả sử bạn có model Product
// const Product = require('../models/Product');

// Mảng tạm để lưu sản phẩm (thay thế database)
let products = [];
let nextId = 1;

// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;

        // Validation
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Tên và giá sản phẩm là bắt buộc'
            });
        }

        const newProduct = {
            id: nextId++,
            name,
            price: parseFloat(price),
            description: description || '',
            category: category || 'Uncategorized',
            stock: stock || 0,
            createdAt: new Date()
        };

        products.push(newProduct);

        // Với database: await Product.create(newProduct);

        res.status(201).json({
            success: true,
            message: 'Thêm sản phẩm thành công',
            data: newProduct
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
        const { name, price, description, category, stock } = req.body;

        const productIndex = products.findIndex(p => p.id === parseInt(id));

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        // Cập nhật thông tin
        products[productIndex] = {
            ...products[productIndex],
            name: name || products[productIndex].name,
            price: price ? parseFloat(price) : products[productIndex].price,
            description: description !== undefined ? description : products[productIndex].description,
            category: category || products[productIndex].category,
            stock: stock !== undefined ? stock : products[productIndex].stock,
            updatedAt: new Date()
        };

        // Với database: await Product.findByIdAndUpdate(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data: products[productIndex]
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

        const productIndex = products.findIndex(p => p.id === parseInt(id));

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        const deletedProduct = products.splice(productIndex, 1)[0];

        // Với database: await Product.findByIdAndDelete(id);

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
        const product = products.find(p => p.id === parseInt(id));

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