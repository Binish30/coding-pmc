const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Import controller

// Routes for category management
router.post('/add', categoryController.createCategory);   // Add a category
router.get('/all', categoryController.getAllCategories);  // Get all categories
router.put('/update/:id', categoryController.updateCategory); // Update a category
router.delete('/delete/:id', categoryController.deleteCategory); // Delete a category

module.exports = router;
