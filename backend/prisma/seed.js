const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // 1. Seed Admin User
  const adminEmail = 'umahomekitchen.haldwani@gmail.com';
  const adminPassword = 'Umakitchen20266';
  
  // Check if admin user already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
    
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash: passwordHash
      }
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists. Skipping...');
  }

  // 2. Seed Menu Items
  const menuItems = [
    // Kumaoni Specials
    {
      name: 'Aloo ke Gutke',
      category: 'Kumaoni Specials',
      description: 'Authentic Kumaoni specialty – spiced potatoes with local spices',
      price: 80,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Poori with Aloo Tamatar Sabzi',
      category: 'Kumaoni Specials',
      description: 'Hot poori served with spiced potato tomato sabzi',
      price: 60,
      isVeg: true,
      isAvailable: true
    },
    
    // Breakfast & Parathas
    {
      name: 'Aloo Paratha',
      category: 'Breakfast & Parathas',
      description: 'Fresh homemade stuffed potato paratha',
      price: 40,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Aloo Pyaaz Paratha',
      category: 'Breakfast & Parathas',
      description: 'Potato and onion stuffed paratha',
      price: 45,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Masala Poha',
      category: 'Breakfast & Parathas',
      description: 'Spiced flattened rice with onions and peas',
      price: 35,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Veg Aloo Sandwich',
      category: 'Breakfast & Parathas',
      description: 'Grilled sandwich with spiced potato filling',
      price: 50,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Masala Macaroni',
      category: 'Breakfast & Parathas',
      description: 'Spiced macaroni with vegetables',
      price: 70,
      isVeg: true,
      isAvailable: true
    },
    
    // Combos
    {
      name: 'Aloo ke Gutke + 6 Poori + Mixed Achar',
      category: 'Combos',
      description: 'Signature combo: Kumaoni aloo ke gutke with 6 poori and mixed pickle',
      price: 150,
      isVeg: true,
      isAvailable: true
    },
    {
      name: '6 Poori + Aloo Tamatar Sabzi + Achar + Salad',
      category: 'Combos',
      description: 'Complete breakfast combo with poori, sabzi, pickle and salad',
      price: 120,
      isVeg: true,
      isAvailable: true
    },
    {
      name: '2 Aloo Paratha with Achar',
      category: 'Combos',
      description: 'Two aloo parathas with pickle',
      price: 80,
      isVeg: true,
      isAvailable: true
    },
    
    // Beverages
    {
      name: 'Special Elaichi Chai',
      category: 'Beverages',
      description: 'Homemade special cardamom tea',
      price: 20,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Masala Tea',
      category: 'Beverages',
      description: 'Spiced masala chai with local spices',
      price: 25,
      isVeg: true,
      isAvailable: true
    },
    {
      name: 'Fresh Homemade Coffee',
      category: 'Beverages',
      description: 'Freshly brewed homemade coffee',
      price: 30,
      isVeg: true,
      isAvailable: true
    }
  ];

  let itemsCreated = 0;
  for (const item of menuItems) {
    const existingItem = await prisma.menuItem.findFirst({
      where: { name: item.name }
    });

    if (!existingItem) {
      await prisma.menuItem.create({
        data: item
      });
      itemsCreated++;
    }
  }

  console.log(`Menu items seeding finished. Created ${itemsCreated} new menu items.`);
  console.log('Database seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
