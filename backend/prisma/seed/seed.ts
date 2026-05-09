import { PrismaClient, UserRole, OrderStatus, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Gaming Laptops',
        slug: 'gaming-laptops',
        description: 'High-performance laptops designed for gaming enthusiasts',
        imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Business Laptops',
        slug: 'business-laptops',
        description: 'Professional laptops for productivity and business',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Creator Laptops',
        slug: 'creator-laptops',
        description: 'Powerful laptops for content creators and designers',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gamertech.com',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  // Create test customer
  const customerPassword = await bcrypt.hash('Customer123!', 12);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      isActive: true,
    },
  });

  console.log(`✅ Created admin and test customer users`);

  // Create gaming laptop products
  const gamingCategory = categories[0];
  
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Alienware m15 R7',
        slug: 'alienware-m15-r7',
        description: 'High performance gaming with RTX 3070 Ti. Experience desktop-level gaming performance in a portable form factor. Features advanced cooling technology and customizable RGB lighting.',
        price: 1499.00,
        stock: 25,
        brand: 'Alienware',
        model: 'm15 R7',
        specs: {
          cpu: 'Intel Core i7-12700H',
          gpu: 'NVIDIA GeForce RTX 3070 Ti',
          ram: '16GB DDR5',
          storage: '1TB NVMe SSD',
          display: '15.6" QHD 240Hz',
          battery: '86Wh',
          weight: '2.42 kg',
          ports: ['USB-C', 'USB-A', 'HDMI 2.1', 'Mini DisplayPort', 'Ethernet'],
        },
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCqs9F1W2yRzBW_PdYokQzAEsPHLvRSeVYA&s',
        ],
        isActive: true,
        isFeatured: true,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'ASUS ROG Zephyrus G14',
        slug: 'asus-rog-zephyrus-g14',
        description: 'Ultra-portable powerhouse with Ryzen 9. The perfect blend of portability and performance for gaming on the go. Features AniMe Matrix display on the lid.',
        price: 1399.00,
        stock: 30,
        brand: 'ASUS',
        model: 'ROG Zephyrus G14',
        specs: {
          cpu: 'AMD Ryzen 9 6900HS',
          gpu: 'AMD Radeon RX 6800S',
          ram: '16GB DDR5',
          storage: '1TB NVMe SSD',
          display: '14" QHD 120Hz',
          battery: '76Wh',
          weight: '1.72 kg',
          ports: ['USB-C', 'USB-A', 'HDMI 2.0b', 'MicroSD'],
        },
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7mrcg_u59UwgVhxKrNwhdDzdsVae0dgcBtw&s',
        ],
        isActive: true,
        isFeatured: true,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Razer Blade 15',
        slug: 'razer-blade-15',
        description: 'Sleek design with OLED display. Professional-grade gaming laptop with premium build quality and stunning visual experience.',
        price: 2299.00,
        stock: 15,
        brand: 'Razer',
        model: 'Blade 15',
        specs: {
          cpu: 'Intel Core i9-12900H',
          gpu: 'NVIDIA GeForce RTX 3070 Ti',
          ram: '32GB DDR5',
          storage: '1TB NVMe SSD',
          display: '15.6" OLED 240Hz',
          battery: '80Wh',
          weight: '2.01 kg',
          ports: ['Thunderbolt 4', 'USB-C', 'USB-A', 'HDMI 2.1'],
        },
        images: [
          'https://www.bhphotovideo.com/images/fb/razer_rz09_03305e53_r3u1_rz09_i7_10875h_16gb_1tb_1567161.jpg',
        ],
        isActive: true,
        isFeatured: true,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'MSI Raider GE76',
        slug: 'msi-raider-ge76',
        description: 'Desktop-level performance for enthusiasts. Maximum power gaming laptop with top-tier components and advanced cooling.',
        price: 2599.00,
        stock: 10,
        brand: 'MSI',
        model: 'Raider GE76',
        specs: {
          cpu: 'Intel Core i9-12900HK',
          gpu: 'NVIDIA GeForce RTX 3080 Ti',
          ram: '32GB DDR5',
          storage: '2TB NVMe SSD',
          display: '17.3" FHD 360Hz',
          battery: '99.9Wh',
          weight: '2.9 kg',
          ports: ['Thunderbolt 4', 'USB-C', 'USB-A', 'HDMI 2.1', 'Mini DisplayPort', 'Ethernet'],
        },
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTleifYwF-9KdASoQDuzpFPQTZ_OArEOkqTfw&s',
        ],
        isActive: true,
        isFeatured: false,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Lenovo Legion 5 Pro',
        slug: 'lenovo-legion-5-pro',
        description: 'Best bang for your buck gaming laptop. Excellent performance with a high-refresh display at a competitive price point.',
        price: 1299.00,
        stock: 40,
        brand: 'Lenovo',
        model: 'Legion 5 Pro',
        specs: {
          cpu: 'AMD Ryzen 7 6800H',
          gpu: 'NVIDIA GeForce RTX 3060',
          ram: '16GB DDR5',
          storage: '512GB NVMe SSD',
          display: '16" WQXGA 165Hz',
          battery: '80Wh',
          weight: '2.49 kg',
          ports: ['USB-C', 'USB-A', 'HDMI 2.1', 'Ethernet'],
        },
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgYn9i1WN-toXShiy1vlW0Jjf2GKG8FmmT7g&s',
        ],
        isActive: true,
        isFeatured: true,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Acer Predator Helios 300',
        slug: 'acer-predator-helios-300',
        description: 'Solid performance and cooling. Reliable gaming laptop with excellent thermal management and consistent performance.',
        price: 1199.00,
        stock: 35,
        brand: 'Acer',
        model: 'Predator Helios 300',
        specs: {
          cpu: 'Intel Core i7-12700H',
          gpu: 'NVIDIA GeForce RTX 3060',
          ram: '16GB DDR5',
          storage: '512GB NVMe SSD',
          display: '15.6" FHD 165Hz',
          battery: '59Wh',
          weight: '2.6 kg',
          ports: ['Thunderbolt 4', 'USB-C', 'USB-A', 'HDMI 2.1', 'Mini DisplayPort'],
        },
        images: [
          'https://m.media-amazon.com/images/I/71sS7G5ZpQL._AC_SL1500_.jpg',
        ],
        isActive: true,
        isFeatured: false,
        categoryId: gamingCategory.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'HP Omen 16',
        slug: 'hp-omen-16',
        description: 'Minimalist look with maximum power. Clean design paired with capable gaming hardware for a refined gaming experience.',
        price: 1349.00,
        stock: 20,
        brand: 'HP',
        model: 'Omen 16',
        specs: {
          cpu: 'Intel Core i7-12700H',
          gpu: 'NVIDIA GeForce RTX 3060',
          ram: '16GB DDR5',
          storage: '1TB NVMe SSD',
          display: '16.1" FHD 144Hz',
          battery: '83Wh',
          weight: '2.35 kg',
          ports: ['Thunderbolt 4', 'USB-C', 'USB-A', 'HDMI 2.1', 'Ethernet'],
        },
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTmiENO8oY49HF_ibNJF0Ihr2DWPIrPRvrA&s',
        ],
        isActive: true,
        isFeatured: false,
        categoryId: gamingCategory.id,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create a sample order for the customer
  const order = await prisma.order.create({
    data: {
      orderNumber: 'GT-' + Date.now(),
      status: OrderStatus.DELIVERED,
      totalAmount: 1499.00,
      shippingAddress: {
        street: '123 Gaming Street',
        city: 'Tech City',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      paymentMethod: 'Credit Card',
      paymentStatus: PaymentStatus.PAID,
      userId: customer.id,
      items: {
        create: [
          {
            quantity: 1,
            price: 1499.00,
            productId: products[0].id,
          },
        ],
      },
    },
  });

  console.log(`✅ Created sample order: ${order.orderNumber}`);

  console.log('\n🎉 Database seed completed successfully!');
  console.log('\n📋 Default Credentials:');
  console.log('   Admin:    admin@gamertech.com / Admin123!');
  console.log('   Customer: customer@example.com / Customer123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
