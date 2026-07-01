import { Body, Query, Controller, Get, Param, Patch, Post, UseInterceptors, ParseIntPipe, Delete } from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto, PlanResponseDto, ListPlansDto, UpdatePlanStatusDto } from './dto';
import { CreatePlanUseCase, UpdatePlanUseCase, ListPlansUseCase, FindPlanUseCase, UpdatePlanStatusUseCase, DeletePlanUseCase } from '../application';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { PlansSwagger } from './plans.swagger';
import { Auth, AuthUser } from 'src/common/decorators';
import { UserRole } from '@prisma/client';

@Controller('plans')
@ApiTags('Plans')
export class PlansController {
  constructor(
    private readonly createPlan: CreatePlanUseCase,
    private readonly listPlans: ListPlansUseCase,
    private readonly updatePlan: UpdatePlanUseCase,
    private readonly findPlan: FindPlanUseCase,
    private readonly updatePlanStatus: UpdatePlanStatusUseCase,
    private readonly deletePlan: DeletePlanUseCase
  ) { }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.findAll)
  async findAll(@AuthUser('id') userId: number, @Query() query: ListPlansDto) {
    const {
      page = '1',
      limit = '10',
      search,
      sortBy,
      sortOrder
    } = query;

    return this.listPlans.execute({
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      search,
      sortBy,
      sortOrder,
      filters: {}
    }, userId);
  }

  @Post()
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.create)
  async create(@Body() dto: CreatePlanDto) {
    return this.createPlan.execute(dto);
  }

  @Get(':id')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.findById)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.findPlan.execute(id);
  }

  @Patch(':id')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.update)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlanDto
  ) {
    return this.updatePlan.execute(id, dto);
  }

  @Delete(':id')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.delete)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deletePlan.execute(id);
  }

  @Patch(':id/status')
  @Auth(UserRole.admin)
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.updateStatus)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlanStatusDto,
  ) {
    return this.updatePlanStatus.execute(
      id,
      dto.active,
    );
  }
}