import { Body, Query, Controller, Get, Param, Patch, Post, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto, PlanResponseDto, ListPlansDto } from './dto';
import { CreatePlanUseCase, UpdatePlanUseCase, ListPlansUseCase } from '../application';
import { SerializeInterceptor } from 'src/common/middlewares/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from 'src/common/decorators/apply-swagger.decorator';
import { PlansSwagger } from './plans.swagger';
import { Auth } from 'src/common/decorators';

@Controller('plans')
@ApiTags('Plans')
export class PlansController {

  constructor(
    private readonly createPlan: CreatePlanUseCase,
    private readonly listPlans: ListPlansUseCase,
    private readonly updatePlan: UpdatePlanUseCase,
  ) { }

  @Post()
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.create)
  async create(@Body() dto: CreatePlanDto) {
    return await this.createPlan.execute(dto);
  }

  @Get()
  @Auth()
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.findAll)
  async findAll(@Query() query: ListPlansDto) {
    const {
      page = '1',
      limit = '10',
      search,
      sortBy,
      sortOrder
    } = query;

    const filters: Record<string, any> = {};

    return this.listPlans.execute({
      page: Math.max(Number(page), 1),
      limit: Math.min(Math.max(Number(limit), 1), 100),
      search,
      sortBy,
      sortOrder,
      filters
    });
  }

  @Patch(':id')
  @Auth('admin')
  @UseInterceptors(new SerializeInterceptor(PlanResponseDto))
  @ApplySwagger(PlansSwagger.update)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlanDto) {
    return await this.updatePlan.execute(id, dto);
  }
}