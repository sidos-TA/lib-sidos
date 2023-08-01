import { Switch as SwitchAntd } from "antd";
import { memo } from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const Switch = ({
  name,
  label,
  required,
  formItemObj,
  rules = [],
  ...props
}) => {
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
      rules={rules}
    >
      <SwitchAntd
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

const SwitchSidos = memo(Switch);
export default SwitchSidos;
