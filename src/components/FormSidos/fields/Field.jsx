import { Alert } from "antd";
import InputSidos from "./InputSidos";
import NumberSidos from "./NumberSidos";
import RadioSidos from "./RadioSidos";
import SelectSidos from "./SelectSidos";
import SwitchSidos from "./SwitchSidos";
import UploadSidos from "./UploadSidos";

const Field = ({ type, name, label, rules, required, ...props }) => {
  const fieldProps = {
    type,
    name,
    label,
    rules,
    required,
  };
  switch (type) {
    case "text":
      return <InputSidos {...fieldProps} {...props} />;
    case "number":
      return <NumberSidos {...fieldProps} {...props} />;
    case "select":
      return <SelectSidos {...fieldProps} {...props} />;
    case "radio":
      return <RadioSidos {...fieldProps} {...props} />;
    case "switch":
      return <SwitchSidos {...fieldProps} {...props} />;
    case "upload":
      return <UploadSidos {...fieldProps} {...props} />;
    default:
      return <Alert message="Tipe field tidak tersedia" type="warning" />;
  }
};
export default Field;
