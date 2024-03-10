import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { PaginationParams } from '../../decorators/pagination.decorator';
import { ApiPagedResponse } from '../../dtos/api-paged-response.dto';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { FireFilters } from './decorators/fire-filter.decorator';
import { FireDto } from './dtos/fire.dto';
import { generateWildfireApiQueryString } from './utils/generate-wildfire-api-query-string.util';

@Injectable()
export class FireService {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
  ) {}

  async getFires(
    filters: FireFilters,
    pagination: PaginationParams,
  ): Promise<ApiPagedResponse<FireDto>> {
    const queryString = generateWildfireApiQueryString(filters, pagination);

    const result = await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('WILDFIRE_API_URL')}&${queryString}`)
        .pipe(
          map((response: AxiosResponse) => {
            const { features, numberMatched } = response.data;

            return {
              data: features.map(({ properties }) => ({
                OBJECTID: properties.OBJECTID,
                FIRE_ID: properties.FIRE_ID,
                FIRE_YEAR: properties.FIRE_YEAR,
                FIRE_NUMBER: properties.FIRE_NUMBER,
                FIRE_CENTRE: properties.FIRE_CENTRE,
                ZONE: properties.ZONE,
                RESPONSE_TYPE_DESC: properties.RESPONSE_TYPE_DESC,
                IGNITION_DATE: properties.IGNITION_DATE,
                FIRE_OUT_DATE: properties.FIRE_OUT_DATE,
                FIRE_STATUS: properties.FIRE_STATUS,
                FIRE_CAUSE: properties.FIRE_CAUSE,
                FIRE_TYPE: properties.FIRE_TYPE,
                INCIDENT_NAME: properties.INCIDENT_NAME,
                GEOGRAPHIC_DESCRIPTION: properties.GEOGRAPHIC_DESCRIPTION,
                LATITUDE: properties.LATITUDE,
                LONGITUDE: properties.LONGITUDE,
                CURRENT_SIZE: properties.CURRENT_SIZE,
                FIRE_URL: properties.FIRE_URL,
                FEATURE_CODE: properties.FEATURE_CODE,
              })),
              meta: {
                count: numberMatched,
                page: pagination.page,
                page_size: pagination.pageSize,
                page_count: Math.ceil(numberMatched / pagination.pageSize),
              },
            } as ApiPagedResponse<FireDto>;
          }),
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );

    return result;
  }
}
