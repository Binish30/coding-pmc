// controllers/productController.js
const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Product Stock
exports.updateStock = async (req, res) => {
    try {
        const { productId, quantity, action } = req.body; // Get product & update details

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (action === "add") {
            product.stock += quantity; // Add stock
        } else if (action === "sell") {
            if (product.stock < quantity) {
                return res.status(400).json({ message: "Insufficient stock!" });
            }
            product.stock -= quantity; // Reduce stock
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        await product.save();

        // Check for low stock alert
        let alertMessage = null;
        if (product.stock <= product.lowStockThreshold) {
            alertMessage = `Warning: Low stock for ${product.name}. Only ${product.stock} left!`;
        }

        res.status(200).json({
            message: "Stock updated successfully",
            stock: product.stock,
            alert: alertMessage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Low Stock Products
exports.getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } }); // Finds products with stock < 5
        res.status(200).json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};