import { Fragment, useEffect, useRef, useState } from "react";
import { responseSuccess } from "../helpers/formatRespons";
import useFetch from "../helpers/useFetch";
import ReactFrappeChart from "react-frappe-charts";

const PieChartSidos = ({ endpoint, payload, customLabel }) => {
  const fetch = useFetch();
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

  return (
    <Fragment>
      {state?.loading ? (
        <>Loading...</>
      ) : (
        <div>
          <button onClick={exportChart} type="button">
            Export
          </button>

          <ReactFrappeChart
            ref={chartRef}
            type="pie"
            height={500}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            data={state?.objDatas}
          />
        </div>
      )}
    </Fragment>
  );
};

export default PieChartSidos;
