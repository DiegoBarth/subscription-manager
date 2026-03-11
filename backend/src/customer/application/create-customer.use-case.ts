import { Injectable, ConflictException } from '@nestjs/common';
import { CustomersRepository } from '../infrastructure/repositories';
import { CreateCustomerDto } from '../adapters/dto';

@Injectable()
export class CreateCustomerUseCase {

  constructor(private readonly customersRepo: CustomersRepository) { }

  async execute(userId: number, data: CreateCustomerDto) {  // <-- recebe userId do controller
    // Verifica se já existe um cliente com o mesmo email para o mesmo usuário
    const existingCustomers = await this.customersRepo.findAll({
      email: data.email,
      userId  // filtra pelo userId
    });

    if (existingCustomers.length > 0) {
      throw new ConflictException('Customer email already registered for this user');
    }

    return this.customersRepo.create({
      ...data,
      userId   // adiciona userId aqui para o repository
    });
  }
}