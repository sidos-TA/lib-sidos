import { Button, Grid } from "antd";
import { Button as ButtonMobile } from "antd-mobile";

const BtnSidos = ({ children, propsDesktop, propsMobile, ...props }) => {
  const { xs } = Grid.useBreakpoint();

  const propsBtn = xs ? propsMobile : propsDesktop;

  const BtnWrapper = xs ? ButtonMobile : Button;

  return (
    <BtnWrapper {...propsBtn} {...props}>
      {children}
    </BtnWrapper>
  );
};

export default BtnSidos;
