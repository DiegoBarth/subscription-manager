import { CustomerStatus } from "@prisma/client";

export class UpdateCustomerStatusDto {
  status!: CustomerStatus;
}