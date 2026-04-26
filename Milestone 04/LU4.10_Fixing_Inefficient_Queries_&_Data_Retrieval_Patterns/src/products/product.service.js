import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MAX_LIMIT = 100;

const PRODUCT_FIELDS = [
  "id",
  "name",
  "description",
  "price",
  "category",
  "stock",
  "imageUrl",
  "isActive",
  "createdAt",
  "updatedAt"
];

export async function getProducts(query) {
  let { page, limit, sortBy, order, fields } = query;

  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  if (!PRODUCT_FIELDS.includes(sortBy)) {
    throw new Error("Invalid sort field");
  }

  if (!["asc", "desc"].includes(order)) {
    throw new Error("Invalid order value");
  }

  let select = undefined;

  if (fields) {
    const requested = fields.split(",");

    const invalid = requested.filter(f => !PRODUCT_FIELDS.includes(f));
    if (invalid.length > 0) {
      throw new Error(`Invalid fields: ${invalid.join(",")}`);
    }

    select = {};
    requested.forEach(f => {
      select[f] = true;
    });
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      select
    }),
    prisma.product.count()
  ]);

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    },
    data
  };
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } });
}