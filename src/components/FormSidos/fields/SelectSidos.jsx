import { Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { responseSuccess } from "../../../helpers/formatRespons";
import useFetch from "../../../helpers/useFetch";
import FormItemSidos from "../form/FormItemSidos";

const SelectSidos = ({
  name,
  label,
  required,
  endpoint,
  payload,
  formItemObj,
  selectLabel = "",
  selectValue = "",
  listOptions = [],
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    listOptions: [],
  });

  const fetchDatas = () => {
    fetch({
      endpoint,
      ...(payload && {
        payload,
      }),
    })?.then((res) => {
      const arrDatas = responseSuccess(res);
      setState({
        ...state,
        listOptions: arrDatas?.data?.map((data) => ({
          label: selectLabel ? data?.[selectLabel] : data,
          value: selectValue ? data?.[selectValue] : data,
        })),
      });
    });
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, []);

  return (
    <FormItemSidos
      name={name}
      label={label}
      required={required}
      {...formItemObj}
    >
      {listOptions?.length ? (
        <Select {...props} size="large" options={listOptions} />
      ) : (
        <Select {...props} size="large">
          {state?.listOptions?.map((item, idx) => (
            <Select.Option
              key={`${item}${idx}`}
              value={item?.value}
              label={item?.label}
            />
          ))}
        </Select>
      )}
    </FormItemSidos>
  );
};

export default SelectSidos;
