const express = require('express');
const { prisma } = require('../config/database');
const { requireAdmin } = require('../middleware/auth');
const { validateMenuItem } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   GET /api/menu
 * @desc    Get all menu items with optional category or availability filtering
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  const { category, available } = req.query;
  
  const where = {};

  if (category) {
    where.category = category;
  }

  if (available !== undefined) {
    where.isAvailable = available === 'true';
  }

  try {
    const items = await prisma.menuItem.findMany({
      where,
      orderBy: { id: 'asc' }
    });

    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/menu
 * @desc    Create a new menu item
 * @access  Admin Only
 */
router.post('/', requireAdmin, validateMenuItem, async (req, res, next) => {
  const { name, category, description, price, isVeg, isAvailable } = req.body;

  try {
    const newItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        category,
        description: description ? description.trim() : null,
        price,
        isVeg: isVeg !== undefined ? isVeg : true,
        isAvailable: isAvailable !== undefined ? isAvailable : true
      }
    });

    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/menu/:id
 * @desc    Update an existing menu item by ID
 * @access  Admin Only
 */
router.put('/:id', requireAdmin, validateMenuItem, async (req, res, next) => {
  const { id } = req.params;
  const { name, category, description, price, isVeg, isAvailable } = req.body;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ success: false, message: 'Invalid menu item ID' });
  }

  try {
    // Check if item exists
    const existing = await prisma.menuItem.findUnique({ where: { id: itemId } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id: itemId },
      data: {
        name: name.trim(),
        category,
        description: description ? description.trim() : null,
        price,
        isVeg: isVeg !== undefined ? isVeg : true,
        isAvailable: isAvailable !== undefined ? isAvailable : true
      }
    });

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/menu/:id
 * @desc    Delete a menu item by ID
 * @access  Admin Only
 */
router.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ success: false, message: 'Invalid menu item ID' });
  }

  try {
    // Check if item exists
    const existing = await prisma.menuItem.findUnique({ where: { id: itemId } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    await prisma.menuItem.delete({
      where: { id: itemId }
    });

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
