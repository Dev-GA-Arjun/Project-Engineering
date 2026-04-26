const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Users
  await prisma.user.createMany({
    data: [
      { name: "Arjun", email: "arjun@test.com" },
      { name: "Rahul", email: "rahul@test.com" }
    ],
    skipDuplicates: true
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      { name: "Shampoo", price: 120, stock: 10 },
      { name: "Hair Oil", price: 150, stock: 5 },
      { name: "Face Wash", price: 200, stock: 8 }
    ],
    skipDuplicates: true
  });

  console.log("✅ Seed data inserted");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });