import { Badge } from "antd";
import BadgeStyled from "../styled/BadgeStyled";

const BadgeSidos = ({ color, children, ...props }) => {
  return (
    <BadgeStyled>
      <Badge color={color} {...props}>
        {children}
      </Badge>
    </BadgeStyled>
  );
};
export default BadgeSidos;
