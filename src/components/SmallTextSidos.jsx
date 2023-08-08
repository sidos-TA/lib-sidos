import { Typography } from "antd";

const SmallTextSidos = ({ children }) => {
  return (
    <Typography.Text type="secondary" style={{ fontSize: 14 }}>
      {children}
    </Typography.Text>
  );
};
export default SmallTextSidos;
