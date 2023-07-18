import { Tag } from "antd";
import TagStyled from "../styled/TagStyled";

const TagSidos = ({ fontSize, padding, children, ...props }) => {
  return (
    <TagStyled fontSize={fontSize} padding={padding}>
      <Tag {...props}>{children}</Tag>
    </TagStyled>
  );
};
export default TagSidos;
