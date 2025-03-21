// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to add a new product
router.post('/add', productController.addProduct);

// Route to get all products
router.get('/all', productController.getAllProducts);

router.get('/low-stock', productController.getLowStockProducts); // Get low stock products

// Route to get a single product by ID
router.get('/:id', productController.getProductById);

// Route to update a product by ID
router.put('/update/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/delete/:id', productController.deleteProduct);

router.put('/update-stock', productController.updateStock); // Update product stock

module.exports = router;

