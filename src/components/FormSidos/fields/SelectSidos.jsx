import { message, Select as SelectAntd } from "antd";
import { Fragment } from "react";
import { memo, useEffect, useState } from "react";
import {
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../../helpers/formatRespons";
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
  rules = [],
  onChange,
  onSelect,
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    listOptions: [],
    openDropdown: false,
  });

  const [messageApi, contextHolderMessage] = message.useMessage();

  const fetchDatas = () => {
    fetch({
      endpoint,
      ...(payload && {
        payload,
      }),
    })
      ?.then((res) => {
        const arrDatas = responseSuccess(res);
        setState({
          ...state,
          listOptions: arrDatas?.data?.map((data) => ({
            label: selectLabel ? data?.[selectLabel] : data,
            value: selectValue ? data?.[selectValue] : data,
          })),
        });
      })
      ?.catch((e) => {
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ messageApi, err });
        } else {
          messageApi.open({
            type: "error",
            key: "errMsg",
            content: err?.error,
          });
        }
      });
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [endpoint, JSON.stringify(payload)]);

  return (
    <Fragment>
      {contextHolderMessage}
      <SelectStyled>
        <FormItemSidos
          name={name}
          label={label}
          required={required}
          rules={rules}
          {...formItemObj}
        >
          {listOptions?.length ? (
            <SelectAntd
              size="large"
              options={listOptions}
              showSearch
              popupMatchSelectWidth={false}
              open={state?.openDropdown}
              onBlur={() =>
                setState((prev) => ({ ...prev, openDropdown: false }))
              }
              onFocus={() =>
                setState((prev) => ({ ...prev, openDropdown: true }))
              }
              onChange={(val) => {
                if (onChange) {
                  onChange(val);
                }
                setState((prev) => ({ ...prev, openDropdown: false }));
              }}
              onSelect={(val) => {
                if (onSelect) {
                  onSelect(val);
                }
              }}
              {...props}
            />
          ) : (
            <SelectAntd
              size="large"
              showSearch
              popupMatchSelectWidth={false}
              {...props}
            >
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
    </Fragment>
  );
};

const SelectSidos = memo(Select);
export default SelectSidos;
