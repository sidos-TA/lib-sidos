import { Grid, Input } from "antd";
import { Input as InputMobile } from "antd-mobile";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const InputSidos = ({
  propsDesktop,
  propsMobile,
  required,
  name,
  label,
  ...props
}) => {
  const { xs } = Grid.useBreakpoint();
  const { form } = useFormContext();
  const [value, setValue] = useState("");

  const InputSidosWrapper = xs ? InputMobile : Input;

  const propsInput = xs ? propsMobile : propsDesktop;

  useEffect(() => {
    if (name) {
      form?.setFieldValue(name, value);
    }
  }, [value]);

  return (
    <FormItemSidos name={name} label={label} required={required}>
      <InputSidosWrapper
        onChange={(val) => {
          if (props?.onChange) {
            props?.onChange(val);
          } else {
            setValue(xs ? val : val?.target?.value);
          }
        }}
        {...props}
        {...(xs && {
          clearable: true,
          style: {
            ...propsInput?.style,
            border: "1px solid #e6e6e6",
            padding: "8px 0 8px 8px",
          },
        })}
      />
    </FormItemSidos>
  );
};

export default InputSidos;