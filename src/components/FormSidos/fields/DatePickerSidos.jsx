import { DatePicker } from "antd";
import dayjs from "dayjs";
import { memo, useEffect } from "react";
import getYearNow from "../../../constants/getYearNow";
import { useFormContext } from "../../../context/FormContext";
import FieldWrapper from "../../../styled/FieldWrapper";
import FormItemSidos from "../form/FormItemSidos";

const DatePickerCustom = ({
  name,
  label,
  required,
  rules = [],
  picker,
  onChange,
  formItemObj = {},
  ...props
}) => {
  const { form } = useFormContext();

  const defaultValueHandler = () => {
    return dayjs(String(getYearNow), "YYYY");
  };

  const disabledDateHandler = (curr) => {
    return curr?.$y > getYearNow || curr?.$y < 2020;
  };

  useEffect(() => {
    if (form && form?.getFieldValue(name)) {
      form.setFieldValue(name, defaultValueHandler());
    }
  }, []);

  return (
    <FieldWrapper>
      <FormItemSidos
        name={name}
        label={label}
        required={required}
        rules={rules}
        {...formItemObj}
      >
        <DatePicker
          picker={picker}
          allowClear={false}
          disabledDate={disabledDateHandler}
          onChange={onChange}
          {...props}
        />
      </FormItemSidos>
    </FieldWrapper>
  );
};

const DatePickerSidos = memo(DatePickerCustom);
export default DatePickerSidos;
