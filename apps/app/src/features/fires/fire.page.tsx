import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  Fire,
  useGetFireMetadataQuery,
  useLazyGetFiresQuery,
} from '../../redux/services/api/fire.api';
import { DownloadButtons } from './download-buttons.component';
import { Filter } from './filter.component';
import { FireMapComponent } from './fire-map.component';
import { FireTable } from './fire-table.component';
import { spreadSearchParams } from './utils/spread-search-params.util';

const { Title } = Typography;

export const FirePage = () => {
  const [searchParams] = useSearchParams({
    page: '1',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [searchParams]);

  const [trigger, { data, isFetching }] = useLazyGetFiresQuery();
  const { data: metadata, isLoading: metadataIsLoading } =
    useGetFireMetadataQuery();

  // ***************************************

  const [page, setPage] = useState<number>(
    +(searchParams.get('page') ?? 1) || 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    +(searchParams.get('page_size') ?? 10) || 10,
  );
  const [total, setTotal] = useState<number>(0);
  const [fireCause] = useState<string | null>(searchParams.get('fire_cause'));
  const [fireStatus] = useState<string | null>(searchParams.get('fire_status'));
  const [geographicDescription] = useState<string | null>(
    searchParams.get('geographic_description'),
  );
  // ***************************************

  useEffect(() => {
    trigger({ ...spreadSearchParams(searchParams) });
  }, [searchParams]);

  useEffect(() => {
    if (data != null) {
      const { meta } = data;

      setPage(meta.page);
      setPageSize(meta.page_size);
      setTotal(meta.count);
    }
  }, [data]);

  useEffect(() => {
    if (searchParams.get('page')) {
      setPage(+(searchParams.get('page') ?? 1) || 1);
    }

    if (searchParams.get('page_size')) {
      setPageSize(+(searchParams.get('page_size') ?? 10) || 10);
    }
  }, [searchParams]);

  return (
    <>
      <Link to={'/'}>
        <Title data-cy="heading" level={1}>
          Wildfires in BC 2023
        </Title>
      </Link>
      <Spin spinning={isFetching}>
        <div data-cy="map">
          <FireMapComponent data={data?.data ? (data.data as Fire[]) : []} />
        </div>
      </Spin>
      <Filter
        fireCause={fireCause}
        fireStatus={fireStatus}
        geographicDescription={geographicDescription}
        metadata={metadata}
        metadataIsLoading={metadataIsLoading}
      />
      <DownloadButtons />
      <FireTable
        data={data}
        isFetching={isFetching}
        page={page}
        pageSize={pageSize}
        total={total}
      />
    </>
  );
};
