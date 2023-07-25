import { LoadingOutlined } from "@ant-design/icons";
import { Col, Spin } from "antd";
import LoadingStyled from "../styled/LoadingStyled";

const LoadingSidos = ({ children, style, ...props }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
      }}
      spin
    />
  );
  return (
    <Col
      span={24}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <LoadingStyled>
        <Spin indicator={antIcon} {...props}>
          {children}
        </Spin>
      </LoadingStyled>
    </Col>
  );
};

export default LoadingSidos;
