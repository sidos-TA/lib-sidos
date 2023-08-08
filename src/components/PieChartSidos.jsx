import { useEffect, useRef, useState } from "react";
import { responseSuccess } from "../helpers/formatRespons";
import useFetch from "../helpers/useFetch";
import ReactFrappeChart from "react-frappe-charts";
import LoadingSidos from "./LoadingSidos";
import { Dropdown, Empty, message, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import catchHandler from "../helpers/catchHandler";
import { Fragment } from "react";

const PieChartSidos = ({ endpoint, payload }) => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    objDatas: {
      labels: [],
      datasets: [{ values: [] }],
      colors: [],
    },
    loading: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const chartRef = useRef();

  const fetchDatas = () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    fetch({
      endpoint,
      payload,
    })
      ?.then((response) => {
        const res = responseSuccess(response);

        if (res?.status === 200) {
          const dataResponse = {
            labels: res?.data?.map((data) => data?.title),
            datasets: [
              {
                values: res?.data?.map((data) => data?.value),
              },
            ],
            colors: res?.data?.map((dt) => dt?.color),
          };

          setState((prev) => ({
            ...prev,
            objDatas: dataResponse,
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  const exportChart = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.export();
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [endpoint, JSON.stringify(payload)]);

  if (state?.loading) {
    return (
      <Fragment>
        {contextHolder}

        <LoadingSidos />
      </Fragment>
    );
  }
  if (state?.objDatas?.datasets?.[0]?.values?.every((data) => data === 0)) {
    return (
      <Fragment>
        {contextHolder}
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {contextHolder}

        <div style={{ textAlign: "right" }}>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  label: "Download",
                  key: "download",
                  onClick: () => exportChart(),
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined
                  style={{
                    rotate: "90deg",
                    fontSize: 28,
                  }}
                />
              </Space>
            </a>
          </Dropdown>

          <ReactFrappeChart
            ref={chartRef}
            type="pie"
            height={500}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            data={state?.objDatas}
            colors={state?.objDatas?.colors}
          />
        </div>
      </Fragment>
    );
  }
};

export default PieChartSidos;
