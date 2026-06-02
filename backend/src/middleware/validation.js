/**
 * Middleware functions for custom input validation
 */

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  
  if (!password || !password.trim()) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  // Basic email pattern regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  next();
};

const validateMenuItem = (req, res, next) => {
  const { name, category, price, isVeg, isAvailable } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Menu item name is required' });
  }

  const validCategories = ['Breakfast & Parathas', 'Kumaoni Specials', 'Combos', 'Beverages'];
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({ 
      success: false, 
      message: `Category is required and must be one of: ${validCategories.join(', ')}` 
    });
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ success: false, message: 'Price is required and must be a number greater than 0' });
  }

  if (isVeg !== undefined && typeof isVeg !== 'boolean') {
    return res.status(400).json({ success: false, message: 'isVeg must be a boolean' });
  }

  if (isAvailable !== undefined && typeof isAvailable !== 'boolean') {
    return res.status(400).json({ success: false, message: 'isAvailable must be a boolean' });
  }

  next();
};

const validateOrder = (req, res, next) => {
  const { customerName, phone, address, deliveryTime, items, totalAmount } = req.body;

  if (!customerName || !customerName.trim()) {
    return res.status(400).json({ success: false, message: 'Customer name is required' });
  }

  if (!phone || !phone.trim() || phone.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'A valid phone number (at least 10 digits) is required' });
  }

  if (!address || !address.trim()) {
    return res.status(400).json({ success: false, message: 'Delivery address is required' });
  }

  if (!deliveryTime || !deliveryTime.trim()) {
    return res.status(400).json({ success: false, message: 'Delivery time is required' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order items must be a non-empty array' });
  }

  // Validate item entries inside items array
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.menuItemId || !item.name || item.price === undefined || item.quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: `Item at index ${i} is missing required fields (menuItemId, name, price, quantity)` 
      });
    }
    if (typeof item.price !== 'number' || item.price < 0) {
      return res.status(400).json({ success: false, message: `Item at index ${i} must have a valid number price >= 0` });
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({ success: false, message: `Item at index ${i} must have a valid number quantity > 0` });
    }
  }

  if (totalAmount === undefined || typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Total amount is required and must be a number greater than 0' });
  }

  next();
};

const validateOrderStatus = (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'In Kitchen', 'Out for Delivery', 'Completed', 'Cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: `Status is required and must be one of: ${validStatuses.join(', ')}` 
    });
  }

  next();
};

module.exports = {
  validateLogin,
  validateMenuItem,
  validateOrder,
  validateOrderStatus
};
