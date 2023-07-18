import axios from "axios";

const useFetch = () => {
  return async ({ endpoint, payload, ...config }) =>
    await axios({
      ...config,
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      ...(payload && {
        data: payload,
      }),
    });
};

export default useFetch;
