import { Input } from "antd";
import FormItemSidos from "../form/FormItemSidos";

const InputSidos = ({ required, name, label, ...props }) => {
  return (
    <FormItemSidos name={name} label={label} required={required}>
      <Input {...props} />
    </FormItemSidos>
  );
};

export default InputSidos;
