import { Button, Grid } from "antd";
import { Button as ButtonMobile } from "antd-mobile";

const BtnSidos = ({ children, props, propsMobile }) => {
  const { xs } = Grid.useBreakpoint();

  if (xs) {
    return <ButtonMobile {...propsMobile}>{children}</ButtonMobile>;
  }
  return <Button {...props}>{children}</Button>;
};

export default BtnSidos;
