import { Space, Typography } from "antd";

const LabelSidos = ({ label, children }) => {
  return (
    <Space direction="vertical" style={{ marginBottom: 20 }}>
      <Typography.Text>{label}</Typography.Text>
      {children}
    </Space>
  );
};
export default LabelSidos;
