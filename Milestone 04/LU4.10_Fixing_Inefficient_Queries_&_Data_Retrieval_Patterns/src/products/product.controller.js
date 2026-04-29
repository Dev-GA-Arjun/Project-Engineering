import { getProducts, getProductById } from './product.service.js';

export async function listProducts(req, res) {
  try {
    let { page = 1, limit = 10, sortBy = "createdAt", order = "desc", fields } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Invalid page or limit" });
    }

    const result = await getProducts({ page, limit, sortBy, order, fields });

    res.json(result);

  } catch (err) {
    if (err.message.includes("Invalid")) {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}