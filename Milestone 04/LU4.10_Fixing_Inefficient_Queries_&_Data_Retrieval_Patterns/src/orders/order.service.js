import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'], // keep this for proof
});

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: true
    }
  });
}

export async function getOrderById(id) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: true
    }
  });
}