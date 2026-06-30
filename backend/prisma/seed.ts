import {
  PrismaClient,
  UserRole,
  SubscriptionStatus,
  PaymentStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //
  // ADMIN
  //
  const adminEmail = 'admin@admin.com';

  let admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        name: 'System Admin',
        email: adminEmail,
        password_hash: await bcrypt.hash('admin123', 10),
        role: UserRole.admin,
      },
    });

    console.log('✅ Admin created');
  }

  //
  // CUSTOMERS (USERS)
  //
  const customer1User = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await bcrypt.hash('123456', 10),
      role: UserRole.customer,
    },
  });

  const customer2User = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password_hash: await bcrypt.hash('123456', 10),
      role: UserRole.customer,
    },
  });

  //
  // CUSTOMER TABLE
  //
  const customer1 = await prisma.customer.upsert({
    where: {
      user_id: customer1User.id,
    },
    update: {},
    create: {
      user_id: customer1User.id,
      name: customer1User.name,
      email: customer1User.email,
      phone: '+55 11 99999-1111',
    },
  });

  await prisma.customer.upsert({
    where: {
      user_id: customer2User.id,
    },
    update: {},
    create: {
      user_id: customer2User.id,
      name: customer2User.name,
      email: customer2User.email,
      phone: '+55 11 99999-2222',
    },
  });

  //
  // PLANS
  //
  const basicPlan = await prisma.plan.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Basic',
      description: 'Basic subscription',
      price: 1990,
      duration_months: 1,
    },
  });

  await prisma.plan.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Premium',
      description: 'Premium subscription',
      price: 4990,
      duration_months: 1,
    },
  });

  await prisma.plan.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Enterprise',
      description: 'Enterprise subscription',
      price: 9990,
      duration_months: 12,
    },
  });

  //
  // ACTIVE SUBSCRIPTION
  //
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      customer_id: customer1.id,
      status: SubscriptionStatus.active,
    },
  });

  let subscription = existingSubscription;

  if (!subscription) {
    subscription = await prisma.subscription.create({
      data: {
        customer_id: customer1.id,
        plan_id: basicPlan.id,
        start_date: new Date(),
        end_date: new Date(
          new Date().setMonth(new Date().getMonth() + 1),
        ),
        status: SubscriptionStatus.active,
        contracted_price: basicPlan.price,
      },
    });
  }

  //
  // PAYMENT
  //
  const paymentExists = await prisma.payment.findFirst({
    where: {
      subscription_id: subscription.id,
    },
  });

  if (!paymentExists) {
    await prisma.payment.create({
      data: {
        subscription_id: subscription.id,
        amount: basicPlan.price,
        due_date: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ),
        status: PaymentStatus.pending,
      },
    });
  }

  console.log('🌱 Seed completed successfully');
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