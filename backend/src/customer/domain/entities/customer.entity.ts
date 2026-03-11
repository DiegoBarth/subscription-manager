export class CustomerEntity {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }

  // Exemplo de método utilitário: verifica se o cliente tem telefone cadastrado
  hasPhone(): boolean {
    return !!this.phone;
  }

  // Exemplo de getter: nome em maiúsculas
  get displayName(): string {
    return this.name.toUpperCase();
  }
}