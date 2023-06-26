import InputSidos from "./InputSidos";
import NotFoundField from "./NotFoundField";
import SelectSidos from "./SelectSidos";
import SwitchSidos from "./SwitchSidos";

const Field = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return <InputSidos propsMobile={props} {...props} />;
    case "select":
      return <SelectSidos propsMobile={props} {...props} />;
    case "switch":
      return <SwitchSidos propsMobile={props} {...props} />;
    default:
      return <NotFoundField>Not found field type</NotFoundField>;
  }
};

export default Field;
