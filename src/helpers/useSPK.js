import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import catchHandler from "./catchHandler";
import { responseSuccess } from "./formatRespons";
import useFetch from "./useFetch";

const useSPK = ({ judul, bidang, jdl_from_dosen, messageApi }) => {
  const navigate = useNavigate();
  const fetch = useFetch();

  const [state, setState] = useState({
    loadingSPK: true,
    arrDatasSPK: [],
    showTableSPK: false,
  });

  const getSPKHandler = () => {
    fetch({
      endpoint: "getSPK",
      payload: {
        judul,
        bidang,
        jdl_from_dosen,
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);

        if (response?.status === 200) {
          setState((prev) => ({
            ...prev,
            arrDatasSPK: response?.data,
            // showTableSPK: true,
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({
          e,
          messageApi,
          navigate,
        });

        setState((prev) => ({
          ...prev,
          showTableSPK: false,
        }));
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          loadingSPK: false,
        }));
      });
  };

  useEffect(() => {
    getSPKHandler();
  }, [state?.loadingSPK]);

  return [state, setState];
};
export default useSPK;
