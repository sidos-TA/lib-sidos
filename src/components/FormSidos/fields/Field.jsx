import { Alert } from "antd";
import CheckboxSidos from "./CheckboxSidos";
import DatePickerSidos from "./DatePickerSidos";
import InputSidos from "./InputSidos";
import NumberSidos from "./NumberSidos";
import RadioSidos from "./RadioSidos";
import SelectSidos from "./SelectSidos";
import SwitchSidos from "./SwitchSidos";
import TransferSidos from "./TransferSidos";
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
    case "checkbox":
      return <CheckboxSidos {...fieldProps} {...props} />;
    case "date":
      return <DatePickerSidos {...fieldProps} {...props} />;
    case "transfer":
      return <TransferSidos {...fieldProps} {...props} />;
    default:
      return <Alert message="Tipe field tidak tersedia" type="warning" />;
  }
};
export default Field;
