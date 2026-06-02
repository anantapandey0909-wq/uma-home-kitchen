const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

/**
 * Middleware to verify authorization token
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No Authorization header provided'
    });
  }

  // Expect token format "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Token format must be Bearer <token>'
    });
  }

  const token = parts[1];

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Contains id, email
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid or expired token'
    });
  }
};

/**
 * Middleware to require admin access (for now, any valid token implies admin)
 */
const requireAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // We can check user roles if implemented in future.
    // For now, since only administrators can login and generate tokens, req.user implies admin.
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    next();
  });
};

module.exports = {
  verifyToken,
  requireAdmin
};
