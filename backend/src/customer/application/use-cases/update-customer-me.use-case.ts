import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCustomerDto } from "src/customer/adapters/dto";
import { CustomersRepository } from "src/customer/infrastructure/repositories";

@Injectable()
export class UpdateCustomerMeUseCase {
  constructor(
    private readonly customersRepo: CustomersRepository,
  ) { }

  async executeMe(userId: number, dto: UpdateCustomerDto) {
    const customer = await this.customersRepo.findActiveByUserId(userId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.deleted_at) {
      throw new BadRequestException('Cannot update deleted customer');
    }

    if (dto.email && dto.email !== customer.email) {
      const emailExists = await this.customersRepo.findByEmail(dto.email);

      if (emailExists && emailExists.id !== customer.id) {
        throw new BadRequestException('Email already in use');
      }
    }

    return this.customersRepo.update(customer.id, {
      name: dto.name,
      email: dto.email,
      phone: dto.phone ?? undefined,
    });
  }
}