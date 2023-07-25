import { InputNumber } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const Number = ({ name, label, required, formItemObj, ...props }) => {
  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      {...formItemObj}
    >
      <InputNumber {...props} />
    </FormItemSidos>
  );
};
const NumberSidos = memo(Number);
export default NumberSidos;
