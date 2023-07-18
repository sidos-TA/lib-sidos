import { Button, Col, Row } from "antd";

const BtnSidos = ({ position, children, ...props }) => {
  const positionHandler = (positionVal) => {
    return positionVal;
  };
  return (
    <Row style={{ margin: "20px 0" }}>
      <Col
        span={24}
        style={{
          textAlign: positionHandler(position),
        }}
      >
        <Button size="large" style={{ padding: "12px 20px 38px" }} {...props}>
          {children}
        </Button>
      </Col>
    </Row>
  );
};

export default BtnSidos;
