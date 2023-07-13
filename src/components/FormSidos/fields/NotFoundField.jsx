import { Grid, Tag } from "antd";

const NotFoundField = ({ children }) => {
  const { xs } = Grid.useBreakpoint();

  return <Tag color="volcano">{children}</Tag>;
};

export default NotFoundField;
