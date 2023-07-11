import { Form, Grid, Select, Typography } from "antd";
import { Button, List, Modal, Space } from "antd-mobile";
import { useEffect, useState } from "react";
import { useFormContext } from "../../../context/FormContext";
import FormItemSidos from "../form/FormItemSidos";
import InputSidos from "./InputSidos";

const SelectSidos = ({ name, label, required, ...props }) => {
  const { xs } = Grid.useBreakpoint();
  const { form } = useFormContext();

  const [visibleSelectMobile, setVisibleSelectMobile] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [listOptions, setListOptions] = useState(props?.listOptions);

  const filterListOptions = (val) => {
    const listOptionValue = props?.listOptions?.filter((lo) =>
      lo?.label?.toLowerCase()?.includes(val?.toLowerCase())
    );

    setListOptions(listOptionValue);
  };

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

  if (xs) {
    return (
      <>
        <Typography.Text
          className="adm-form-item-label"
          style={{
            paddingLeft: "var(--padding-left)",
            fontSize: "var(--adm-font-size-7  )",
          }}
        >
          {label}
        </Typography.Text>

        <InputSidos
          onClick={() => setVisibleSelectMobile(true)}
          value={valueInput}
          placeholder={label || props?.placeholder}
        />

        <Modal
          closeOnMaskClick
          content={
            <Space direction="vertical">
              <Typography.Text
                className="adm-form-item-label"
                style={{
                  textAlign: "center",
                  paddingLeft: "var(--padding-left)",
                  fontSize: "var(--adm-font-size-7  )",
                }}
              >
                {label}
              </Typography.Text>
              <InputSidos onChange={filterListOptions} />
              <FormItemSidos name={name} required={required}>
                <List>
                  {listOptions?.map((data) => {
                    return (
                      <List.Item
                        arrow={false}
                        key={data?.value}
                        onClick={() => {
                          setValueInput(data?.value);
                          setVisibleSelectMobile(false);
                        }}
                      >
                        {data?.label}
                      </List.Item>
                    );
                  })}
                </List>
              </FormItemSidos>
            </Space>
          }
          visible={visibleSelectMobile}
          onClose={() => setVisibleSelectMobile(false)}
        />
      </>
    );
  }

  return (
    <FormItemSidos name={name} label={label}>
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
