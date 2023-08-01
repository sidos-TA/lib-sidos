import { Form, Typography } from "antd";

const FormItemSidos = ({
  children,
  name,
  label,
  required,
  rules = [],
  ...props
}) => {
  return (
    <Form.Item
      labelCol={{ span: 24 }}
      name={name}
      label={
        <Typography.Text style={{ fontSize: 18 }}>{label}</Typography.Text>
      }
      {...(required
        ? {
            rules: [
              {
                required: true,
                message: `Mohon isi ${label}`,
              },
              ...rules,
            ],
          }
        : { rules })}
      {...props}
    >
      {children}
    </Form.Item>
  );
};

export default FormItemSidos;
