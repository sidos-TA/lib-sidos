import { Input } from "antd";
import FormItemSidos from "../form/FormItemSidos";

const InputSidos = ({ required, name, label, formItemObj, ...props }) => {
  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      {...formItemObj}
    >
      <Input size="large" {...props} />
    </FormItemSidos>
  );
};

export default InputSidos;
