import { Input } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const TextAreaComponent = ({
  name,
  label,
  required,
  rules = [],
  formItemObj = {},
  onChange,
  ...props
}) => {
  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      rules={rules}
      {...formItemObj}
    >
      <Input.TextArea
        rows={5}
        onChange={({ target: { value } }) => {
          if (onChange) {
            onChange(value);
          }
        }}
        {...props}
      />
    </FormItemSidos>
  );
};
const TextAreaSidos = memo(TextAreaComponent);
export default TextAreaSidos;
