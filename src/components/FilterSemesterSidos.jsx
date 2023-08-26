import { Col, message, Row } from "antd";
import { memo } from "react";
import { Fragment, useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import semesterList from "../constants/semesterList";
import catchHandler from "../helpers/catchHandler";
import { responseSuccess } from "../helpers/formatRespons";
import useFetch from "../helpers/useFetch";
import SelectSidos from "./FormSidos/fields/SelectSidos";

const FilterSemesterComponent = ({ payloadState, setStatePayload }) => {
  const [messageApi, contextHolderMessage] = message.useMessage();
  const fetch = useFetch();
  const [semester, setSemester] = useState("");
  const [tahun, setTahun] = useState("");
  const navigate = useNavigate();

  const updateFilter = useCallback(
    ({ propPayload, val }) => {
      setStatePayload((prev) => ({
        ...prev,
        [propPayload]: val,
      }));
    },
    [payloadState]
  );

  const getSetting = () => {
    fetch({
      endpoint: "getSetting",
    })
      ?.then((response) => {
        const res = responseSuccess(response);

        if (res?.status === 200) {
          setStatePayload((prev) => ({
            ...prev,
            semester: res?.data?.semester,
            tahun: res?.data?.tahun,
          }));

          setSemester(res?.data?.semester);
          setTahun(res?.data?.tahun);
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
  };

  useEffect(() => {
    getSetting();
    // }, [pathname]);
  }, []);

  return (
    <Fragment>
      {contextHolderMessage}

      <Row justify="center" align="middle" gutter={8}>
        <Col>
          <SelectSidos
            label="Semester"
            listOptions={semesterList}
            value={semester}
            onChange={(val) => {
              setSemester(val);
              updateFilter({ propPayload: "semester", val });
            }}
          />
        </Col>
        <Col>
          <SelectSidos
            label="Tahun"
            endpoint="getTahun"
            selectLabel="tahun"
            selectValue="tahun"
            value={tahun}
            onChange={(val) => {
              setTahun(val);
              updateFilter({ propPayload: "tahun", val });
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

const FilterSemesterSidos = memo(FilterSemesterComponent);
export default FilterSemesterSidos;
