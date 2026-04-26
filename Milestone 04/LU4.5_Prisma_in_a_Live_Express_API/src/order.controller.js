// order.controller.js
const prisma = require('./lib/db');

// POST /orders/purchase
const purchaseItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {

      const product = await tx.product.findUnique({
        where: { id: productId }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      if (product.stock <= 0) {
        throw new Error('Out of stock');
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          productId,
          quantity: 1
        }
      });

      // Decrement stock
      await tx.product.update({
        where: { id: productId },
        data: {
          stock: { decrement: 1 }
        }
      });

      return order;
    });

    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /orders/:userId
const getOrdersByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        product: true
      }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { purchaseItem, getOrdersByUser };