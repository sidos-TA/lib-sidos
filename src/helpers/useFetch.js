import axios from "axios";
import getCookie from "./getCookie";

const useFetch = () => {
  const cookie = getCookie("token");
  return async ({ endpoint, payload, ...config }) =>
    await axios({
      ...config,
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      ...(payload && {
        data: payload,
      }),
      ...(cookie && {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }),
      // withCredentials: true,
    });
};

export default useFetch;
