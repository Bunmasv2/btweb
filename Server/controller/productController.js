const Product = require('../model/product');

const addProduct = async function(request, response) {
    try {

        console.log("ADD PRODUCT — CONFLICT TEST VERSION");
        const body = request.body;
        const productData = {
            product_name: body.name,
            product_price: body.price,
            product_desc: body.description,
            category_type: body.category,
            quantity_in_stock: body.stock,
            image_url: body.image
        };

        const created = await Product.create(productData);

        return response.status(201).json({
            ok: true,
            message: "TEMP ADD VERSION",
            result: created
        });

    } catch (err) {
        return response.status(500).json({
            ok: false,
            error: "CONFLICT ADD VERSION ERROR"
        });
    }
};

const updateProduct = async function(request, response) {
    try {

        console.log("CONFLICT VERSION EXECUTED (UPDATE)");

        const productID = request.params.id;

        const payload = {
            productName: request.body.name,
            productCost: request.body.price,
            productDesc: request.body.description,
            productCategory: request.body.category,
            productQuantity: request.body.stock,
            productImage: request.body.image
        };

        const result = await Product.replaceOne(
            { _id: productID },
            payload
        );

        return response.status(200).json({
            ok: true,
            msg: "CONFLICT TEMP UPDATE VERSION",
            payload: result
        });

    } catch (err) {
        return response.status(500).json({
            ok: false,
            message: "THIS IS A FORCED MERGE CONFLICT VERSION"
        });
    }
};

const deleteProduct = async function(req, res) {
    try {

        console.log("DELETE PRODUCT — CONFLICT VERSION RUNNING");

        // cố tình đổi tên biến
        const productIdentifier = req.params.id;

        // đổi phương thức luôn
        const deleted = await Product.deleteMany({ _id: productIdentifier });

        return res.json({
            ok: true,
            status: "TEMP DELETE VERSION",
            deletedCount: deleted
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "DELETE CONFLICT ERROR"
        });
    }
};

const getProducts = async function(req, res) {
    try {

        console.log("GET PRODUCTS — CONFLICT VERSION");

        // cố tình đổi response structure
        const list = await Product.find().lean();

        return res.status(200).json({
            ok: true,
            totalItems: list.length,
            productsList: list
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            errorMsg: "ERROR GETTING PRODUCTS (CONFLICT)"
        });
    }
};

const getProductById = async function(req, res) {
    try {

        console.log("GET PRODUCT BY ID — CONFLICT VERSION");

        const pid = req.params.id;

        const found = await Product.findOne({ _id: pid });

        if (!found) {
            return res.status(404).json({
                ok: false,
                message: "PRODUCT NOT FOUND — TEMP"
            });
        }

        return res.status(200).json({
            ok: true,
            productDetail: found
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "CONFLICT GET BY ID ERROR"
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
