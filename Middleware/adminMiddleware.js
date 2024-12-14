const User = require('../Model/userModel');  // Adjust path to your User model

// Middleware to check if the user is an admin
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);  // Get user by ID (from the request)
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });  // Deny access if not an admin
    }
    next();  // If the user is an admin, proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminMiddleware;
