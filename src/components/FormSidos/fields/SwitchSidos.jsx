import { Grid, Switch as SwitchDesktop } from "antd";
import { Switch as SwitchMobile } from "antd-mobile";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const SwitchSidos = ({
  name,
  label,
  checkText = "",
  uncheckText = "",
  propsDesktop,
  propsMobile,
  ...props
}) => {
  const { xs } = Grid.useBreakpoint();
  const [valueSwitch, setValueSwitch] = useState(false);

  const { form } = useFormContext();

  const Switch = xs ? SwitchMobile : SwitchDesktop;

  const propsSwitch = xs ? propsMobile : propsDesktop;

  useEffect(() => {
    if (name) {
      form?.setFieldValue(name, valueSwitch);
    }
  }, [valueSwitch]);
  return (
    <FormItemSidos name={name} label={label}>
      <Switch
        {...(xs
          ? { checkedText: checkText, uncheckedText: uncheckText }
          : { checkedChildren: checkText, unCheckedChildren: uncheckText })}
        {...propsSwitch}
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
