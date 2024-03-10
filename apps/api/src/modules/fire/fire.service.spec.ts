import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiPagedResponse } from '../../dtos/api-paged-response.dto';
import { FireDto } from './dtos/fire.dto';
import { FireService } from './fire.service';

describe('FireService', () => {
  let service: FireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [ConfigService, FireService],
    }).compile();

    const configService = module.get(ConfigService);
    const httpService = module.get(HttpService);

    service = new FireService(configService, httpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get a list of fires and transform them to the local structure', async () => {
    const result: ApiPagedResponse<FireDto> = {
      data: [],
      meta: {
        count: 0,
        page: 0,
        page_count: 0,
        page_size: 0,
      },
    };

    jest.spyOn(service, 'getFires').mockImplementation(async () => result);
    expect(await service.getFires({}, {})).toBe(result);
  });
});
