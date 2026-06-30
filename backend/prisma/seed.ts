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
  // USERS
  //
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@admin.com',
      password_hash: await bcrypt.hash('Admin123!', 10),
      role: UserRole.admin,
    },
  });

  const johnUser = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await bcrypt.hash('User123!', 10),
      role: UserRole.customer,
    },
  });

  const janeUser = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password_hash: await bcrypt.hash('User123!', 10),
      role: UserRole.customer,
    },
  });

  const bobUser = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Brown',
      email: 'bob@example.com',
      password_hash: await bcrypt.hash('User123!', 10),
      role: UserRole.customer,
    },
  });

  //
  // CUSTOMERS
  //
  const john = await prisma.customer.upsert({
    where: { user_id: johnUser.id },
    update: {},
    create: {
      user_id: johnUser.id,
      name: johnUser.name,
      email: johnUser.email,
      phone: '+55 11 99999-1111',
    },
  });

  const jane = await prisma.customer.upsert({
    where: { user_id: janeUser.id },
    update: {},
    create: {
      user_id: janeUser.id,
      name: janeUser.name,
      email: janeUser.email,
      phone: '+55 11 99999-2222',
    },
  });

  const bob = await prisma.customer.upsert({
    where: { user_id: bobUser.id },
    update: {},
    create: {
      user_id: bobUser.id,
      name: bobUser.name,
      email: bobUser.email,
      phone: '+55 11 99999-3333',
    },
  });

  //
  // PLANS
  //
  const basic = await prisma.plan.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Basic',
      description: 'Basic subscription',
      price: 1990,
      duration_months: 1,
    },
  });

  const premium = await prisma.plan.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Premium',
      description: 'Premium subscription',
      price: 4990,
      duration_months: 1,
    },
  });

  const enterprise = await prisma.plan.upsert({
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
  // JOHN -> ACTIVE
  //
  let johnSubscription = await prisma.subscription.findFirst({
    where: {
      customer_id: john.id,
    },
  });

  if (!johnSubscription) {
    johnSubscription = await prisma.subscription.create({
      data: {
        customer_id: john.id,
        plan_id: basic.id,
        start_date: new Date(),
        end_date: new Date(
          new Date().setMonth(new Date().getMonth() + 1),
        ),
        contracted_price: basic.price,
        status: SubscriptionStatus.active,
      },
    });
  }

  //
  // JANE -> EXPIRED
  //
  let janeSubscription = await prisma.subscription.findFirst({
    where: {
      customer_id: jane.id,
    },
  });

  if (!janeSubscription) {
    janeSubscription = await prisma.subscription.create({
      data: {
        customer_id: jane.id,
        plan_id: premium.id,
        start_date: new Date(
          new Date().setMonth(new Date().getMonth() - 2),
        ),
        end_date: new Date(
          new Date().setMonth(new Date().getMonth() - 1),
        ),
        contracted_price: premium.price,
        status: SubscriptionStatus.expired,
      },
    });
  }

  //
  // BOB -> CANCELED
  //
  let bobSubscription = await prisma.subscription.findFirst({
    where: {
      customer_id: bob.id,
    },
  });

  if (!bobSubscription) {
    bobSubscription = await prisma.subscription.create({
      data: {
        customer_id: bob.id,
        plan_id: enterprise.id,
        start_date: new Date(),
        end_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1),
        ),
        contracted_price: enterprise.price,
        status: SubscriptionStatus.canceled,
      },
    });
  }

  //
  // PAYMENTS
  //

  const createPayment = async (
    subscriptionId: number,
    amount: number,
    status: PaymentStatus,
    dueOffset: number,
  ) => {
    const exists = await prisma.payment.findFirst({
      where: {
        subscription_id: subscriptionId,
        status,
      },
    });

    if (!exists) {
      await prisma.payment.create({
        data: {
          subscription_id: subscriptionId,
          amount,
          due_date: new Date(
            new Date().setDate(new Date().getDate() + dueOffset),
          ),
          paid_at:
            status === PaymentStatus.paid
              ? new Date()
              : null,
          refunded_at:
            status === PaymentStatus.refunded
              ? new Date()
              : null,
          payment_method:
            status === PaymentStatus.paid
              ? 'credit_card'
              : null,
          status,
        },
      });
    }
  };

  //
  // JOHN
  //

  await createPayment(
    johnSubscription.id,
    basic.price,
    PaymentStatus.pending,
    7,
  );

  await createPayment(
    johnSubscription.id,
    basic.price,
    PaymentStatus.paid,
    -30,
  );

  await createPayment(
    johnSubscription.id,
    basic.price,
    PaymentStatus.refunded,
    -60,
  );

  await createPayment(
    johnSubscription.id,
    basic.price,
    PaymentStatus.failed,
    -90,
  );

  //
  // JANE
  //

  await createPayment(
    janeSubscription.id,
    premium.price,
    PaymentStatus.pending,
    -15,
  );

  //
  // BOB
  //

  await createPayment(
    bobSubscription.id,
    enterprise.price,
    PaymentStatus.pending,
    20,
  );

  console.log('');
  console.log('===============================');
  console.log('Seed executed successfully');
  console.log('===============================');
  console.log('');

  console.log('Admin');
  console.log('admin@admin.com');
  console.log('Admin123!');

  console.log('');

  console.log('Customer');
  console.log('john@example.com');
  console.log('User123!');

  console.log('');

  console.log('Customer');
  console.log('jane@example.com');
  console.log('User123!');

  console.log('');

  console.log('Customer');
  console.log('bob@example.com');
  console.log('User123!');

  console.log('');
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