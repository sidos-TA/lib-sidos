import { InputNumber } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const Number = ({
  name,
  label,
  required,
  rules = [],
  formItemObj,
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
      <InputNumber
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
        }}
        {...props}
      />
    </FormItemSidos>
  );
};
const NumberSidos = memo(Number);
export default NumberSidos;
