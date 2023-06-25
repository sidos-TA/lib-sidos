import InputSidos from "./InputSidos";
import SelectSidos from "./SelectSidos";

const Field = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return <InputSidos propsMobile={props} {...props} />;
    case "select":
      return <SelectSidos propsMobile={props} {...props} />;
  }
};

export default Field;
