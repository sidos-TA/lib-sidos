import { message, Transfer } from "antd";
import { Fragment, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import catchHandler from "../../../helpers/catchHandler";
import { responseSuccess } from "../../../helpers/formatRespons";
import useFetch from "../../../helpers/useFetch";
import LoadingSidos from "../../LoadingSidos";
import FormItemSidos from "../form/FormItemSidos";

const TransferComponents = ({
  name,
  label,
  required = false,
  rules = [],
  formItemObj = {},
  endpoint,
  payload,
  selectLabel,
  selectValue,
  arrTargetKeys = [],
  customFetch,
  ...props
}) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [arrDatas, setArrDatas] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const fetch = useFetch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const fetchDatas = () => {
    setIsLoadingFetch(true);
    fetch({
      endpoint,
      payload,
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setArrDatas(
            res?.data?.map((data) => ({
              key: data?.[selectValue || Object.keys(data)?.[0]],
              title: data?.[selectLabel || Object.keys(data)?.[1]],
            }))
          );
          if (customFetch) {
            customFetch(res?.data);
          }
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setIsLoadingFetch(false);
      });
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [endpoint, JSON.stringify(payload)]);

  useEffect(() => {
    setTargetKeys(arrTargetKeys);
  }, [JSON.stringify(arrTargetKeys)]);

  return (
    <Fragment>
      {contextHolder}

      {isLoadingFetch ? (
        <LoadingSidos />
      ) : (
        <FormItemSidos
          name={name}
          label={label}
          required={required}
          rules={rules}
          {...formItemObj}
        >
          <Transfer
          showSearch
          
            dataSource={arrDatas}
            titles={["Dosen", "Kaprodi"]}
            targetKeys={targetKeys}
            onChange={onChange}
            render={(item) => item.title}
            pagination={{
              pageSize: 10,
            }}
            style={{
              height: 500,
            }}
            {...props}
          />
        </FormItemSidos>
      )}
    </Fragment>
  );
};
const TransferSidos = memo(TransferComponents);
export default TransferSidos;
