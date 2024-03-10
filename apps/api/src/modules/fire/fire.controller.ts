import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from '../../decorators/pagination.decorator';
import { FireFilter, FireFilters } from './decorators/fire-filter.decorator';
import { FireService } from './fire.service';
import { exportFiresAsCsv } from './utils/export-fires-as-csv.util';

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

  @Get('download')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="fires.csv"')
  async getFiresAsCsv(
    @FireFilter() filters?: FireFilters,
    @Pagination() pagination?: PaginationParams,
  ) {
    const { data } = await this.fireService.getFires(filters, pagination);
    const csv = exportFiresAsCsv('fires.csv', data);

    return csv;
  }

  @Get('metadata')
  getMetadata() {
    return this.fireService.getMetadata();
  }
}
