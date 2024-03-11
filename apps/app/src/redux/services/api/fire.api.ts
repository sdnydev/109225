import { api } from '.';

interface ApiResponse {
  data: Record<string, any>;
}

interface ApiPagedResponse<T> {
  data: T[];
  meta: {
    count: number;
    page: number;
    page_count: number;
    page_size: number;
  };
}

interface FireFilterParams {
  geographic_description?: string;
  fire_cause?: string;
  fire_status?: string;
  page?: number;
  page_size?: number;
}

export class Fire {
  OBJECTID: number;
  FIRE_ID: number;
  FIRE_YEAR: number;
  FIRE_NUMBER: string;
  FIRE_CENTRE: number;
  ZONE: number;
  RESPONSE_TYPE_DESC?: string;
  IGNITION_DATE?: string;
  FIRE_OUT_DATE?: string;
  FIRE_STATUS?: string;
  FIRE_CAUSE?: string;
  FIRE_TYPE?: string;
  INCIDENT_NAME?: string;
  GEOGRAPHIC_DESCRIPTION?: string;
  LATITUDE?: number;
  LONGITUDE?: number;
  CURRENT_SIZE?: number;
  FIRE_URL?: string;
  FEATURE_CODE?: string;
}

export const fireApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFires: builder.query<ApiPagedResponse<Fire>, FireFilterParams>({
      query: (args) => {
        const parts: string[] = [];

        for (const [key, value] of Object.entries(args)) {
          parts.push(`${key}=${value}`);
        }

        return `/v1/fires${parts.length > 0 ? `?${parts.join('&')}` : ''}`;
      },
    }),
    getFireMetadata: builder.query<ApiResponse, void>({
      query: () => 'v1/fires/metadata',
    }),
  }),
});

export const { useLazyGetFiresQuery, useGetFireMetadataQuery } = fireApi;
