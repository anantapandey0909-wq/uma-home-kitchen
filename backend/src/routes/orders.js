const express = require('express');
const { prisma } = require('../config/database');
const { requireAdmin } = require('../middleware/auth');
const { validateOrder, validateOrderStatus } = require('../middleware/validation');
const transporter = require('../config/mailer');

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Place a new customer order
 * @access  Public
 */
router.post('/', validateOrder, async (req, res, next) => {
  const { customerName, email,phone, address, deliveryTime, paymentMethod,items, totalAmount,latitude,longitude } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        latitude,
        longitude,
        deliveryTime: deliveryTime.trim(),
        paymentMethod,
        
        items, // Stores directly in JSON Column (jsonb in PostgreSQL)
        totalAmount,
        status: 'Pending' // Initial default status

      }
    });
    const orderTime = new Date().toLocaleString();

const itemsList = items
  .map(item => `${item.name} x ${item.quantity} - ₹${item.price}`)
  .join('\n');
  
    res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders with optional status filter
 * @access  Admin Only
 */
router.get('/', requireAdmin, async (req, res, next) => {
  const { status } = req.query;

  const where = {};
  if (status && status !== 'All') {
    where.status = status;
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      orderBy: { id: 'desc' } // Newest orders first
    });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get order details by ID
 * @access  Admin Only
 */
router.get('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return res.status(400).json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status
 * @access  Admin Only
 */
router.patch('/:id/status', requireAdmin, validateOrderStatus, async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return res.status(400).json({ success: false, message: 'Invalid order ID' });
  }

  try {
    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Update status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
