import { Col, message, Row, Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forbiddenResponse,
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../helpers/formatRespons";
import useFetch from "../../helpers/useFetch";
import TableStyled from "../../styled/TableStyled";
import LoadingSidos from "../LoadingSidos";

const TableSidos = ({
  endpoint,
  payload,
  children,
  customFilter = [],
  arrDatas = [],
  isLoading = false,
  customFetch,
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    arrDatas: [],
    loading: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const loadingFetchHandler = (loading) =>
    setState((prev) => ({
      ...prev,
      loading,
    }));

  const fetchDatas = () => {
    loadingFetchHandler(true);
    fetch({
      endpoint,
      payload,
    })
      ?.then((res) => {
        const responses = responseSuccess(res);

        if ("data" in responses) {
          if (customFetch) {
            customFetch(responses);
          } else {
            setState((prev) => ({
              ...prev,
              arrDatas: responses?.data?.map((data, key) => ({ ...data, key })),
            }));
          }
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ err, messageApi });
        } else if (err?.status === 403) {
          forbiddenResponse({ err, navigate });
        } else {
          messageApi.open({
            type: "error",
            key: "errMsg",
            content: err?.error,
          });
        }
      })
      ?.finally(() => {
        loadingFetchHandler(false);
      });
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [endpoint, JSON.stringify(payload)]);

  useEffect(() => {
    if (arrDatas?.length) {
      setState((prev) => ({
        ...prev,
        arrDatas: arrDatas?.map((data) => ({ ...data, key: data?.nip })),
      }));
    }
  }, [JSON.stringify(arrDatas)]);

  return (
    <>
      {contextHolder}
      <TableStyled>
        <Space direction="vertical" size="large">
          {customFilter?.length ? (
            <Row gutter={8} wrap>
              {customFilter?.map((eleFilter, idx) => {
                return (
                  <Col span={24 / customFilter?.length} key={idx}>
                    {eleFilter}
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Fragment />
          )}

          {state?.loading || isLoading ? (
            <LoadingSidos style={{ height: "50vh", width: "100vh" }} />
          ) : (
            <Table bordered {...props} dataSource={state?.arrDatas}>
              {children}
            </Table>
          )}
        </Space>
      </TableStyled>
    </>
  );
};

export default TableSidos;
