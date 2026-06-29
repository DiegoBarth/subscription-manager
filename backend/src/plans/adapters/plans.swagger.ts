import { UserRole } from "src/users/domain/enums";
import { CreatePlanDto, UpdatePlanDto, PlanResponseDto } from "./dto";

export const PlansSwagger = {
  create: {
    summary: 'Create a new plan (Admin only)',
    bearerAuth: true,
    bodyType: CreatePlanDto,
    roles: [UserRole.ADMIN],
    responseType: PlanResponseDto
  },
  findAll: {
    summary: 'List all plans (Paginated)',
    bearerAuth: true,
    responseType: PlanResponseDto,
    queryParams: [
      { name: 'page', required: false, example: 1 },
      { name: 'limit', required: false, example: 10 },
      { name: 'search', required: false, example: 'Premium' },
      { name: 'sortBy', required: false, example: 'id' },
      { name: 'sortOrder', required: false, example: 'ASC' }
    ],
  },
  findById: {
    summary: 'Get plan by ID',
    bearerAuth: true,
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: PlanResponseDto
  },
  update: {
    summary: 'Update plan by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdatePlanDto,
    roles: [UserRole.ADMIN],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: PlanResponseDto
  }
};