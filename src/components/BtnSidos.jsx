import { Button } from "antd";

const BtnSidos = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default BtnSidos;
