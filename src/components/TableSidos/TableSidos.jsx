import { FileExcelFilled } from "@ant-design/icons";
import { Col, message, Row, Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../../../components/FilterSemester";
import catchHandler from "../../helpers/catchHandler";
import { responseSuccess } from "../../helpers/formatRespons";
import useDownloads from "../../helpers/useDownloads";
import useFetch from "../../helpers/useFetch";
import TableStyled from "../../styled/TableStyled";
import BtnSidos from "../BtnSidos";
import LoadingSidos from "../LoadingSidos";

const TableSidos = ({
  endpoint,
  payload,
  children,
  customFilter = [],
  arrDatas = [],
  isLoading = false,
  customFetch,
  excelOptions = {
    endpoint: "",
    fileName: "Data",
  },
  useFilterSemester = false,
  extraButton = [],
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    arrDatas: [],
    loading: false,
    arrColumnDatas: [],
    loadingExcel: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [payloadSemester, setPayloadSemester] = useState();

  const loadingFetchHandler = (loading) =>
    setState((prev) => ({
      ...prev,
      loading,
    }));

  const fetchDatas = () => {
    loadingFetchHandler(true);
    fetch({
      endpoint,
      payload: {
        ...payload,
        ...payloadSemester,
      },
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
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        loadingFetchHandler(false);
      });
  };

  const { loading, downloadHandler } = useDownloads({
    endpoint: excelOptions?.endpoint,
    filename: excelOptions?.fileName,
    messageApi,
    payload: payloadSemester,
  });

  const exportToExcel = () => {
    setState((prev) => ({ ...prev, loadingExcel: true }));
    downloadHandler();
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [endpoint, JSON.stringify(payload), JSON.stringify(payloadSemester)]);

  useEffect(() => {
    if (arrDatas?.length) {
      setState((prev) => ({
        ...prev,
        arrDatas: arrDatas?.map((data) => ({ ...data, key: data?.nip })),
      }));
    }
  }, [
    JSON.stringify(arrDatas),
    JSON.stringify(payload),
    JSON.stringify(payloadSemester),
  ]);

  return (
    <>
      {contextHolder}
      <TableStyled>
        <Space direction="vertical" size="large">
          {useFilterSemester ? (
            <FilterSemester
              payloadState={payloadSemester}
              setStatePayload={setPayloadSemester}
            />
          ) : (
            <Fragment />
          )}
          <Row gutter={8} align="middle">
            <Col span={18}>
              {customFilter?.length ? (
                <Row gutter={8}>
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
            </Col>
            <Col span={4}>
              {extraButton?.length ? (
                <Space>
                  {extraButton?.map((btn, idx) => (
                    <Fragment key={idx}>{btn}</Fragment>
                  ))}
                </Space>
              ) : (
                <Fragment />
              )}
            </Col>

            {excelOptions?.endpoint && (
              <Col span={2}>
                <BtnSidos
                  icon={<FileExcelFilled style={{ color: "green" }} />}
                  loading={loading}
                  onClick={() => exportToExcel()}
                >
                  Export Excel
                </BtnSidos>
              </Col>
            )}
          </Row>

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
