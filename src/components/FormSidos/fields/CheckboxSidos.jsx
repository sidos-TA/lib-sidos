import { Checkbox } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const CheckBoxCustom = ({
  label,
  name,
  required,
  rules,
  formItemObj,
  listOptions = [],
  ...props
}) => {
  return (
    <FormItemSidos
      label={label}
      name={name}
      required={required}
      rules={rules}
      {...formItemObj}
    >
      <Checkbox.Group options={listOptions} {...props} />
    </FormItemSidos>
  );
};

const CheckboxSidos = memo(CheckBoxCustom);
export default CheckboxSidos;
