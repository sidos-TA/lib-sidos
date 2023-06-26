import { Grid, Tag } from "antd";
import { NoticeBar } from "antd-mobile";

const NotFoundField = ({ children }) => {
  const { xs } = Grid.useBreakpoint();

  if (xs) {
    return <NoticeBar icon={null} content={children} color="error" />;
  }
  return <Tag color="volcano">{children}</Tag>;
};

export default NotFoundField;
