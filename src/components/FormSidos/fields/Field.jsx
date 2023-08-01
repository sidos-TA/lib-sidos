import { Alert } from "antd";
import InputSidos from "./InputSidos";
import NumberSidos from "./NumberSidos";
import RadioSidos from "./RadioSidos";
import SelectSidos from "./SelectSidos";
import SwitchSidos from "./SwitchSidos";
import UploadSidos from "./UploadSidos";

const Field = ({ type, name, label, required, ...props }) => {
  switch (type) {
    case "text":
      return (
        <InputSidos name={name} label={label} required={required} {...props} />
      );
    case "number":
      return (
        <NumberSidos name={name} label={label} required={required} {...props} />
      );
    case "select":
      return (
        <SelectSidos name={name} label={label} required={required} {...props} />
      );
    case "radio":
      return (
        <RadioSidos name={name} label={label} required={required} {...props} />
      );
    case "switch":
      return (
        <SwitchSidos name={name} label={label} required={required} {...props} />
      );
    case "upload":
      return (
        <UploadSidos name={name} label={label} required={required} {...props} />
      );
    default:
      return <Alert message="Tipe field tidak tersedia" type="warning" />;
  }
};
export default Field;
