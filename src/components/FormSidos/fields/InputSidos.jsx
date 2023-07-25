import { Input as InputAntd } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const Input = ({
  required,
  type,
  name,
  label,
  formItemObj,
  onChange,
  ...props
}) => {
  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      {...formItemObj}
    >
      {type === "password" ? (
        <InputAntd.Password
          size="large"
          {...props}
          onChange={({ target: { value } }) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      ) : (
        <InputAntd
          size="large"
          {...props}
          onChange={({ target: { value } }) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      )}
    </FormItemSidos>
  );
};

const InputSidos = memo(Input);
export default InputSidos;
