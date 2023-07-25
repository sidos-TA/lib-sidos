import { useEffect, useRef, useState } from "react";
import { responseError, responseSuccess } from "../helpers/formatRespons";
import useFetch from "../helpers/useFetch";
import ReactFrappeChart from "react-frappe-charts";
import LoadingSidos from "./LoadingSidos";
import { Dropdown, Empty, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PieChartSidos = ({ endpoint, payload }) => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    objDatas: {
      labels: [],
      datasets: [{ values: [] }],
    },
    loading: false,
  });

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
          };

          setState((prev) => ({
            ...prev,
            objDatas: dataResponse,
          }));
        }
      })
      ?.catch((e) => {
        const err = responseError(e);

        if (err?.status == 403) {
          navigate("/unauth");
        }
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
  }, [endpoint]);

  if (state?.loading) {
    return <LoadingSidos />;
  }
  if (state?.objDatas?.datasets?.[0]?.values?.every((data) => data === 0)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  } else {
    return (
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
        />
      </div>
    );
  }
};

export default PieChartSidos;
