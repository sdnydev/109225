import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        xxl={12}
        style={{ padding: '2rem' }}
      >
        <Outlet />
      </Col>
    </Row>
  );
}

export default App;
