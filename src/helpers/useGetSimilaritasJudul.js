import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import catchHandler from "./catchHandler";
import { responseSuccess } from "./formatRespons";
import useFetch from "./useFetch";

const useGetSimilaritasJudul = ({ judul, messageApi }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoadingGetSimilar: false,
    arrDatas: [],
    openModal: false,
  });
  const fetch = useFetch();

  const getSimilaritasHandler = () => {
    setState((prev) => ({ ...prev, isLoadingGetSimilar: true }));
    fetch({
      endpoint: "getSimilaritasJudul",
      payload: {
        judul_mhs: judul,
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          // filter menampilkan judul yg tak sama dg judul yg diusulkan
          const arrSimilarJudul = res?.data;
          // ?.filter((jdl) => {
          //   return jdl?.judul !== judul;
          // });
          setState((prev) => ({
            ...prev,
            arrDatas: arrSimilarJudul,
            openModal: true,
          }));
        }
        // openModalSimilaritasJudul(true);
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setState((prev) => ({ ...prev, isLoadingGetSimilar: false }));
      });
  };

  useEffect(() => {
    if (state?.isLoadingGetSimilar) {
      getSimilaritasHandler();
    }
  }, [state?.isLoadingGetSimilar]);

  return [state, setState];
};
export default useGetSimilaritasJudul;
