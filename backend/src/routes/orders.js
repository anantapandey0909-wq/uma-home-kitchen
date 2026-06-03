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
  const { customerName, email,phone, address, deliveryTime, items, totalAmount } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        deliveryTime: deliveryTime.trim(),
        items, // Stores directly in JSON Column (jsonb in PostgreSQL)
        totalAmount,
        status: 'Pending' // Initial default status
      }
    });
    const orderTime = new Date().toLocaleString();

const itemsList = items
  .map(item => `${item.name} x ${item.quantity} - ₹${item.price}`)
  .join('\n');
  /*
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'New Order Received - Uma Home Kitchen',
  text: `
New Order Received

Order Time: ${orderTime}

Customer: ${customerName}
Phone: ${phone}
Address: ${address}
Delivery Time: ${deliveryTime}

Items:
${itemsList}

Total Amount: ₹${totalAmount}

Order ID: ${newOrder.id}
`
});*/
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Order Confirmation - Uma Home Kitchen',
  text: `
Dear ${customerName},

Thank you for your order from Uma Home Kitchen.

Order ID: ${newOrder.id}
Total Amount: ₹${totalAmount}

We have received your order and will start preparing it shortly.

Thank you for choosing Uma Home Kitchen!

Regards,
Uma Home Kitchen
`
});

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
