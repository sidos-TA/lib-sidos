import axios from "axios";
import getCookie from "./getCookie";

const useFetch = () => {
  const cookie = getCookie("token");
  return async ({ method = "post", endpoint, payload, ...config }) =>
    await axios({
      ...config,
      method,
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
