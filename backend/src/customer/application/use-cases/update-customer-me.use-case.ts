import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCustomerDto } from "src/customer/adapters/dto";
import { CustomersRepository } from "src/customer/infrastructure/repositories";

@Injectable()
export class UpdateCustomerMeUseCase {
  constructor(
    private readonly customersRepo: CustomersRepository,
  ) { }

  async executeMe(userId: number, dto: UpdateCustomerDto) {
    const customer = await this.customersRepo.findByUserId(userId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const updated = await this.customersRepo.update(customer.id, {
      name: dto.name,
      email: dto.email,
      phone: dto.phone ?? undefined,
    });

    return updated;
  }
}