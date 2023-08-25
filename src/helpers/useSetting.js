import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import catchHandler from "./catchHandler";
import { responseSuccess } from "./formatRespons";
import useFetch from "./useFetch";

const useSetting = ({ messageApi }) => {
  const navigate = useNavigate();

  const fetch = useFetch();
  const [state, setState] = useState();

  const getSetting = () => {
    fetch({
      endpoint: "getSetting",
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setState(res?.data);
        }
      })
      ?.catch((e) => {
        catchHandler({
          e,
          messageApi,
          navigate,
        });
      });
    //   ?.finally(() => {});
  };

  useEffect(() => {
    getSetting();
  }, []);

  return state;
};
export default useSetting;
