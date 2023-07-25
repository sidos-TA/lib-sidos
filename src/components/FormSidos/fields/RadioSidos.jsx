import { Grid, Radio } from "antd";
import { memo } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const RadioSidosComponent = ({
  name,
  label,
  required,
  propsDesktop,
  propsMobile,
  listOptions,
  onChange,
  ...props
}) => {
  const { form } = useFormContext();
  const { xs } = Grid.useBreakpoint();

  const propsRadio = xs ? propsMobile : propsDesktop;

  return (
    <FormItemSidos name={name} label={label} required={required} {...props}>
      <Radio.Group
        size="large"
        options={listOptions}
        optionType="button"
        onChange={({ target: { value } }) => {
          if (onChange) {
            onChange(value);
          }
        }}
        {...propsRadio}
      />
    </FormItemSidos>
  );
};

const RadioSidos = memo(RadioSidosComponent);
export default RadioSidos;
