import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from '../../decorators/pagination.decorator';
import { FireFilter, FireFilters } from './decorators/fire-filter.decorator';
import { FireService } from './fire.service';

@ApiTags('fires')
@Controller({ version: '1', path: 'fires' })
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(
    @FireFilter() filters?: FireFilters,
    @Pagination() pagination?: PaginationParams,
  ) {
    return this.fireService.getFires(filters, pagination);
  }
}
