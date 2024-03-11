import { Col, Form, Input, Row, Select, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  useGetFireMetadataQuery,
  useLazyGetFiresQuery,
} from '../../redux/services/api/fire.api';

const { Title, Text } = Typography;

const spreadSearchParams = (params?: URLSearchParams) => {
  if (!params) return {};

  const obj: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
};

export const FirePage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [searchParams]);

  console.log('searchParams: ', searchParams);

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
  const [fireCause, setFireCause] = useState<string | null>(
    searchParams.get('fire_cause'),
  );
  const [fireStatus, setFireStatus] = useState<string | null>(
    searchParams.get('fire_status'),
  );
  const [geographicDescription, setGeographicDescription] = useState<
    string | null
  >(searchParams.get('geographic_description'));
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
        <Title level={1}>Wildfires in BC 2023</Title>
      </Link>
      <Row gutter={8}>
        <Col xs={24} md={12}>
          <Form.Item
            htmlFor="geographicDescription"
            label={<Text strong>Geographic Description</Text>}
            labelCol={{ span: 24 }}
          >
            <Input.Search
              onSearch={(value) => {
                setSearchParams((prev) => {
                  if (value == null || value === '') {
                    prev.delete('geographic_description');
                  } else {
                    prev.append('geographic_description', value);
                  }

                  prev.set('page', '1');
                  return {
                    ...spreadSearchParams(prev),
                  };
                });
              }}
              allowClear={true}
              disabled={metadataIsLoading}
              defaultValue={geographicDescription ?? ''}
              id="geographicDescription"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            htmlFor="fireCause"
            label={<Text strong>Fire Cause</Text>}
            labelCol={{ span: 24 }}
          >
            <Select
              onChange={(value) => {
                setSearchParams((prev) => {
                  if (value == null) {
                    prev.delete('fire_cause');
                  } else {
                    prev.append('fire_cause', value);
                  }

                  prev.set('page', '1');
                  return {
                    ...spreadSearchParams(prev),
                  };
                });
              }}
              allowClear={true}
              defaultValue={fireCause}
              disabled={metadataIsLoading}
              id="fireCause"
              loading={metadataIsLoading}
              options={metadata?.data.FIRE_CAUSE.map((value: string) => ({
                label: value,
                value,
              }))}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            htmlFor="fireStatus"
            label={<Text strong>Fire Status</Text>}
            labelCol={{ span: 24 }}
          >
            <Select
              onChange={(value) => {
                setSearchParams((prev) => {
                  if (value == null) {
                    prev.delete('fire_status');
                  } else {
                    prev.append('fire_status', value);
                  }

                  prev.set('page', '1');
                  return {
                    ...spreadSearchParams(prev),
                  };
                });
              }}
              allowClear={true}
              defaultValue={fireStatus}
              disabled={metadataIsLoading}
              id="fireStatus"
              loading={metadataIsLoading}
              options={metadata?.data.FIRE_STATUS.map((value: string) => ({
                label: value,
                value,
              }))}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Table
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
          total: total,
        }}
        scroll={{ x: true }}
      />
    </>
  );
};
