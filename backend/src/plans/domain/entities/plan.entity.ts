export class PlanEntity {

  id: number;
  name: string;
  description?: string | null;
  price: number;
  durationMonths: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: Partial<PlanEntity>) {
    Object.assign(this, partial);
  }
}