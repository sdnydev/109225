import { Col, Form, Input, Row, Select, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { ApiResponse } from '../../redux/services/api/fire.api';
import { spreadSearchParams } from './utils/spread-search-params.util';

interface Props {
  fireCause: string | null;
  fireStatus: string | null;
  geographicDescription: string | null;
  metadata: ApiResponse | undefined;
  metadataIsLoading: boolean;
}

export const Filter = ({
  fireCause,
  fireStatus,
  geographicDescription,
  metadata,
  metadataIsLoading,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { Text } = Typography;

  return (
    <Row data-cy="filters" gutter={8}>
      <Col xs={24} md={12}>
        <Form.Item
          htmlFor="geographicDescription"
          label={<Text strong>Geographic Description</Text>}
          labelCol={{ span: 24 }}
        >
          <Input.Search
            data-cy="geographic-description"
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
            data-cy="fire-cause"
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
          data-cy="fire-status"
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
  );
};
