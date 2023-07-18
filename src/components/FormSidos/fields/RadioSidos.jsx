import { Grid, Radio } from "antd";
import { memo } from "react";
import FormItemSidos from "../form/FormItemSidos";

const RadioSidosComponent = ({
  name,
  label,
  required,
  propsDesktop,
  propsMobile,
  listOptions,
  ...props
}) => {
  const { xs } = Grid.useBreakpoint();

  const propsRadio = xs ? propsMobile : propsDesktop;

  return (
    <FormItemSidos name={name} label={label} required={required} {...props}>
      <Radio.Group
        size="large"
        options={listOptions}
        optionType="button"
        {...propsRadio}
      />
    </FormItemSidos>
  );
};

const RadioSidos = memo(RadioSidosComponent);
export default RadioSidos;
