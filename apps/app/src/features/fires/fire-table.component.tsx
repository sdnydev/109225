import { Table } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { ApiPagedResponse, Fire } from '../../redux/services/api/fire.api';
import { spreadSearchParams } from './utils/spread-search-params.util';

interface Props {
  data: ApiPagedResponse<Fire> | undefined;
  isFetching: boolean;
  page: number;
  pageSize: number;
  total: number;
}

export const FireTable = ({
  data,
  isFetching,
  page,
  pageSize,
  total,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  });

  return (
    <Table
      data-cy="table"
      columns={Object.keys(data?.data[0] || []).map((k) => {
        return {
          title: k,
          dataIndex: k,
          key: k,
          ...(k === 'FIRE_URL' && {
            render: (value) => {
              return (
                <a target="_blank" referrerPolicy="no-referrer" href={value}>
                  {value}
                </a>
              );
            },
          }),
        };
      })}
      dataSource={(data?.data || []).map((d) => ({
        key: d.OBJECTID,
        ...d,
      }))}
      loading={isFetching}
      pagination={{
        onChange(page, pageSize) {
          setSearchParams((prev) => {
            prev.set('page', `${page}`);
            prev.set('page_size', `${pageSize}`);

            return {
              ...spreadSearchParams(prev),
            };
          });
        },
        current: page,
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100, 500, 1000, 2000, 3000],
        total: total,
      }}
      scroll={{ x: true }}
    />
  );
};
