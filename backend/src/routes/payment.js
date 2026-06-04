const express = require('express');
const razorpay = require('../config/razorpay');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Payment route is working'
  });
});

router.post('/create-order', async (req, res) => {
  try {
    console.log('Received amount:', req.body.amount);
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
});

module.exports = router;