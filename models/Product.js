const mongoose = require("mongoose");

// Define Schema for Product
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true }, // Name of the product
  productID: { type: String, unique: true, required: true }, // Unique identifier
  description: String, // Description of product
  category: { type: String, required: true }, // Product category
  quantity: { type: Number, required: true }, // Stock quantity
  price: { type: Number, required: true }, // Price of the product
  supplierInfo: String, // Optional supplier details
  stock: { type: Number, required: true, default: 0 }, // Track stock levels
  lowStockThreshold: { type: Number, default: 5 }, // Notify when stock is low
  dateAdded: { type: Date, default: Date.now }, // Timestamp when added
  lastUpdated: { type: Date, default: Date.now }, // Timestamp of last update
});

// Create and export the model
module.exports = mongoose.model("Product", productSchema);
