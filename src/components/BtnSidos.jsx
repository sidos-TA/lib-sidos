import { Button, Grid } from "antd";
import { Button as ButtonMobile } from "antd-mobile";

const BtnSidos = ({ children, propsDesktop, propsMobile, ...props }) => {
  const { xs } = Grid.useBreakpoint();

  if (xs) {
    return (
      <ButtonMobile {...propsMobile} {...props}>
        {children}
      </ButtonMobile>
    );
  }
  return (
    <Button {...propsDesktop} {...props}>
      {children}
    </Button>
  );
};

export default BtnSidos;
