import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiPagedResponse } from '../../dtos/api-paged-response.dto';
import { FireDto } from './dtos/fire.dto';
import { FireController } from './fire.controller';
import { FireService } from './fire.service';

describe('FireController', () => {
  let controller: FireController;
  let service: FireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      controllers: [FireController],
      providers: [ConfigService, FireService],
    }).compile();

    const configService = module.get(ConfigService);
    const httpService = module.get(HttpService);

    service = new FireService(configService, httpService);
    controller = new FireController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('(GET) /fires', async () => {
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
    expect(await controller.getFires()).toBe(result);
  });
});
