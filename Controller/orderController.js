const Order = require('../Model/orderModel'); // Import Order model
const OrderItem = require('../Model/orderItemModel'); // Import OrderItem model

// Place Order
const placeOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const order = new Order({ userId, totalAmount });
    await order.save();

    // Save Order Items
    const orderItems = items.map((item) => ({
      ...item,
      orderId: order._id,
    }));
    await OrderItem.insertMany(orderItems);

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// View Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { placeOrder, getOrders, getOrderById, cancelOrder };
