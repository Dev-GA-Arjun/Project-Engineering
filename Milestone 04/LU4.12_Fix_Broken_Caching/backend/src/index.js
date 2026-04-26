const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* =========================
   CACHE SERVICE (Refactored)
========================= */
const cacheStore = new Map();

const TTL = 60 * 1000; // 60 seconds

const cacheService = {
  get(key) {
    const entry = cacheStore.get(key);
    if (!entry) return null;

    const { value, expiry } = entry;

    if (Date.now() > expiry) {
      cacheStore.delete(key);
      return null;
    }

    return value;
  },

  set(key, value) {
    if (value === null || value === undefined) return; // prevent bad caching

    cacheStore.set(key, {
      value,
      expiry: Date.now() + TTL
    });
  },

  del(key) {
    cacheStore.delete(key);
  },

  delByPrefix(prefix) {
    for (let key of cacheStore.keys()) {
      if (key.startsWith(prefix)) {
        cacheStore.delete(key);
      }
    }
  }
};

/* =========================
   GET /tasks
========================= */
app.get('/tasks', async (req, res) => {
  try {
    const cacheKey = 'tasks:list';

    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('Serving from cache');
      return res.status(200).json(cached);
    }

    const tasks = await prisma.task.findMany();

    cacheService.set(cacheKey, tasks);

    return res.status(200).json(tasks);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   GET /tasks/:id
========================= */
app.get('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cacheKey = `task:${id}`;

    const cached = cacheService.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    cacheService.set(cacheKey, task);

    return res.status(200).json(task);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   POST /tasks
========================= */
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        price: parseFloat(price)
      }
    });

    // Invalidate list cache
    cacheService.delByPrefix('tasks:list');

    return res.status(201).json(newTask);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   DELETE /tasks/:id
========================= */
app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.task.delete({
      where: { id }
    });

    // Invalidate specific + list cache
    cacheService.del(`task:${id}`);
    cacheService.delByPrefix('tasks:list');

    return res.status(200).json({ message: 'Deleted successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ========================= */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Fixed Server running on http://localhost:${PORT}`);
});