import { Form, Grid } from "antd";
import { Form as FormMobile } from "antd-mobile";

const FormItemSidos = ({ children, name, label, ...props }) => {
  const { xs } = Grid.useBreakpoint();

  const FormItem = xs ? FormMobile.Item : Form.Item;

  return (
    <FormItem name={name} label={label} {...props}>
      {children}
    </FormItem>
  );
};

export default FormItemSidos;
