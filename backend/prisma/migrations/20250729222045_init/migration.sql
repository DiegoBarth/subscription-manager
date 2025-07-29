/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `durationMonths` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_months` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."customer" DROP CONSTRAINT "customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payment" DROP CONSTRAINT "payment_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscription" DROP CONSTRAINT "subscription_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscription" DROP CONSTRAINT "subscription_planId_fkey";

-- AlterTable
ALTER TABLE "public"."customer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."payment" DROP COLUMN "paymentMethod",
DROP COLUMN "subscriptionId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "subscription_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."plan" DROP COLUMN "durationMonths",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "duration_months" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."subscription" DROP COLUMN "customerId",
DROP COLUMN "endDate",
DROP COLUMN "planId",
DROP COLUMN "startDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "plan_id" INTEGER NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
