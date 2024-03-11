import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={18}
        xl={18}
        xxl={18}
        style={{ padding: '2rem' }}
      >
        <Outlet />
      </Col>
    </Row>
  );
}

export default App;
