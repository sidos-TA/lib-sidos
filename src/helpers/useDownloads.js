import { useState } from "react";
import { useNavigate } from "react-router-dom";
import catchHandler from "./catchHandler";
import useFetch from "./useFetch";

const useDownloads = ({ endpoint, filename, messageApi, payload }) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    loading: false,
  });
  const navigate = useNavigate();

  const toggleLoading = (isLoading) =>
    setState((prev) => ({ ...prev, loading: isLoading }));

  const downloadHandler = () => {
    toggleLoading(true);

    fetch({
      endpoint,
      responseType: "blob",
      payload,
    })
      ?.then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const linkEle = document.createElement("a");
        linkEle.href = url;
        linkEle.download = `${filename}.xlsx`;
        document.body.appendChild(linkEle);
        linkEle?.click();

        messageApi?.open({
          type: "success",
          content: `File ${filename}.xlsx berhasil didownload`,
        });
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        toggleLoading(false);
      });
  };

  return {
    loading: state?.loading,
    downloadHandler,
  };
};

export default useDownloads;
