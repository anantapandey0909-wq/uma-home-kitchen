const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { validateLogin } = require('../middleware/validation');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

/**
 * @route   POST /api/auth/login
 * @desc    Login administrator and generate access token
 * @access  Public
 */
router.post('/login', validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find admin user in database
    const admin = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() }
    });
    console.log("Admin found:", admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password with hashed copy
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token with payload (expires in 1 day)
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
