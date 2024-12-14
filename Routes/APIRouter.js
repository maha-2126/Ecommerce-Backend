const express = require('express');
const userController = require('../Controller/userController');
const productController = require('../Controller/productController');
const orderController = require('../Controller/orderController');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');

const router = express.Router();

// User Routes
router.post('/users/register', userController.registerUser); // User Registration
router.post('/users/login', userController.loginUser); // User Login
router.get('/users/:id', userController.getUserProfile); // View Profile
router.put('/users/:id', userController.updateUserProfile); // Update Profile

// Product Routes
router.get('/products', productController.getProducts); // List Products (No auth needed)
router.get('/products/:id', productController.getProductById); // View Single Product (No auth needed)
router.post('/products', authMiddleware, adminMiddleware, productController.addProduct); // Add Product (Admin only)
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct); // Update Product (Admin only)
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct); // Delete Product (Admin only)

// Order Routes
router.post('/orders', authMiddleware, orderController.placeOrder); // Place Order (Auth required)
router.get('/orders', authMiddleware, orderController.getOrders); // View Order History (Auth required)
router.get('/orders/:id', authMiddleware, orderController.getOrderById); // View Single Order (Auth required)
router.delete('/orders/:id', authMiddleware, orderController.cancelOrder); // Cancel Order (Auth required)


module.exports = router;
