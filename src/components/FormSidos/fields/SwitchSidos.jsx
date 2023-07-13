import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const SwitchSidos = ({ name, label, required, formItemObj, ...props }) => {
  const [valueSwitch, setValueSwitch] = useState(false);

  const { form } = useFormContext();

  useEffect(() => {
    if (name) {
      form?.setFieldValue(name, valueSwitch);
    }
  }, [valueSwitch]);
  return (
    <FormItemSidos
      {...formItemObj}
      name={name}
      label={label}
      required={required}
    >
      <Switch
        {...props}
        onChange={(val) => {
          if (props?.onChange) {
            props?.onChange(val);
          } else {
            setValueSwitch(val);
          }
        }}
      />
    </FormItemSidos>
  );
};

export default SwitchSidos;
