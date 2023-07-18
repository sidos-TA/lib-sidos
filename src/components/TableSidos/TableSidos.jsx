import { Col, Row, Skeleton, Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { responseSuccess } from "../../helpers/formatRespons";
import useFetch from "../../helpers/useFetch";
import TableStyled from "../../styled/TableStyled";
import TableLoading from "./TableLoading";

const TableSidos = ({
  endpoint,
  payload,
  children,
  customFilter = [],
  arrDatas = [],
  isLoading = false,
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    arrDatas: [],
    loading: false,
  });

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

        if (responses?.data?.length) {
          setState((prev) => ({
            ...prev,
            arrDatas: responses?.data?.map((data, key) => ({ ...data, key })),
          }));
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
        arrDatas: arrDatas?.map((data, idx) => ({ ...data, key: data?.nip })),
      }));
    }
  }, [JSON.stringify(arrDatas)]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      loading: isLoading,
    }));
  }, [isLoading]);

  return (
    <TableStyled>
      {state?.loading ? (
        <TableLoading />
      ) : (
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
          <Table {...props} bordered dataSource={state?.arrDatas}>
            {children}
          </Table>
        </Space>
      )}
    </TableStyled>
  );
};

export default TableSidos;
