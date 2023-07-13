import { Grid, Select } from "antd";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";

const SelectSidos = ({ name, label, required, formItemObj, ...props }) => {
  const { xs } = Grid.useBreakpoint();
  const { form } = useFormContext();

  const [valueInput, setValueInput] = useState("");
  const [listOptions, setListOptions] = useState(props?.listOptions);

  useEffect(() => {
    if (props?.listOptions && name) {
      form?.setFieldValue(name, valueInput);
    }
  }, [JSON.stringify(valueInput)]);

  useEffect(() => {
    if (xs && props?.listOptions) {
      setListOptions(props?.listOptions);
    }
  }, [JSON.stringify(props?.listOptions)]);

  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      {...formItemObj}
    >
      <Select
        {...props}
        options={listOptions}
        onSelect={(val) => {
          if (props?.onSelect) {
            props?.onSelect(val);
          } else {
            setValueInput(val);
          }
        }}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input?.toLowerCase())
        }
        style={{ width: 120 }}
      />
    </FormItemSidos>
  );
};

export default SelectSidos;
