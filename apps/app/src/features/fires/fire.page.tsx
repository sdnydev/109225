import { Typography } from 'antd';
import { useEffect } from 'react';
import { useLazyGetFiresQuery } from '../../redux/services/api/fire.api';

const { Title } = Typography;

export const FirePage = () => {
  const [trigger, { data, isLoading }] = useLazyGetFiresQuery();

  useEffect(() => {
    trigger();
  }, []);

  return (
    <>
      <Title level={1}>Wildfires in BC 2023</Title>
      {data != null && <pre>{JSON.stringify(data)}</pre>}
      asdf {import.meta.env.VITE_APP_URL}
    </>
  );
};
