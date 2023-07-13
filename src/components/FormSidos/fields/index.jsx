import InputSidos from "./InputSidos";
import NotFoundField from "./NotFoundField";
import SelectSidos from "./SelectSidos";
import SwitchSidos from "./SwitchSidos";

const Field = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return <InputSidos {...props} />;
    case "select":
      return <SelectSidos {...props} />;
    case "switch":
      return <SwitchSidos {...props} />;
    default:
      return <NotFoundField>Not found field type</NotFoundField>;
  }
};

export default Field;
