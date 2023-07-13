import { Form } from "antd";

const FormItemSidos = ({ children, name, label, required, ...props }) => {
  return (
    <Form.Item name={name} label={label} required={required} {...props}>
      {children}
    </Form.Item>
  );
};

export default FormItemSidos;
