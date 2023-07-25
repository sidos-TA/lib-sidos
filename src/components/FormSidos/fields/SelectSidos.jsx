import { Select as SelectAntd } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { responseSuccess } from "../../../helpers/formatRespons";
import useFetch from "../../../helpers/useFetch";
import SelectStyled from "../../../styled/SelectStyled";
import FormItemSidos from "../form/FormItemSidos";

const Select = ({
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
  }, [endpoint, JSON.stringify(payload)]);

  return (
    <SelectStyled>
      <FormItemSidos
        name={name}
        label={label}
        required={required}
        {...formItemObj}
      >
        {listOptions?.length ? (
          <SelectAntd
            {...props}
            size="large"
            options={listOptions}
            showSearch
          />
        ) : (
          <SelectAntd {...props} size="large" showSearch>
            {state?.listOptions?.map((item, idx) => (
              <SelectAntd.Option
                key={`${item}${idx}`}
                value={item?.value}
                label={item?.label}
              />
            ))}
          </SelectAntd>
        )}
      </FormItemSidos>
    </SelectStyled>
  );
};

const SelectSidos = memo(Select);
export default SelectSidos;
