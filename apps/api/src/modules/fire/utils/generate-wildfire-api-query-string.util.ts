import { PaginationParams } from '../../../decorators/pagination.decorator';
import { FireFilters } from '../decorators/fire-filter.decorator';

export const generateWildfireApiQueryString = (
  filters: FireFilters,
  pagination: PaginationParams,
) => {
  const { fireCause, fireStatus, geographicDescription } = filters;
  const { page, pageSize } = pagination;

  const filterString = [
    ...(fireCause ? [`FIRE_CAUSE='${fireCause}'`] : []),
    ...(fireStatus ? [`FIRE_STATUS='${fireStatus}'`] : []),
    ...(geographicDescription
      ? [`GEOGRAPHIC_DESCRIPTION='${geographicDescription}'`]
      : []),
  ].join(' AND ');

  return [
    ...(filterString.length > 0 ? [`cql_filter=${filterString}`] : []),
    [`count=${pageSize}`, `startIndex=${(page - 1) * pageSize}`].join('&'),
  ].join('&');
};
