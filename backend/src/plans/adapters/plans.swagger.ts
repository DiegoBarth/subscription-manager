import { UserRole } from "@prisma/client";
import { CreatePlanDto, UpdatePlanDto, PlanResponseDto, UpdatePlanStatusDto } from "./dto";
import { SuccessResponseDto } from "src/common/dto";

export const PlansSwagger = {
  create: {
    summary: 'Create a new plan (Admin only)',
    bearerAuth: true,
    bodyType: CreatePlanDto,
    roles: [UserRole.admin],
    responseType: PlanResponseDto
  },
  findAll: {
    summary: 'List all plans - Paginated',
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
    summary: 'Get plan by ID (Admin only)',
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
    roles: [UserRole.admin],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: PlanResponseDto
  },
  updateStatus: {
    summary: 'Update plan by ID (Admin only)',
    bearerAuth: true,
    bodyType: UpdatePlanStatusDto,
    roles: [UserRole.admin],
    param: {
      name: 'id',
      type: Number,
      example: 1
    },
    responseType: SuccessResponseDto
  },
  delete: {
    summary: 'Delete plan (admin only)',
    bearerAuth: true,
    responseType: SuccessResponseDto,
  }
};