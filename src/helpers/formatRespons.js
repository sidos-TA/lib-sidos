import deleteCookie from "./deleteCookie";

const responseSuccess = (res, isMessage = false) => {
  if (res?.status === 200) {
    if (!isMessage && res?.data) {
      const { data } = res;
      return data;
    }
    return {
      message: res?.message,
    };
  }
};

const responseError = (res) => {
  if (res?.status !== 200) {
    return {
      error: res?.response?.data?.error,
      status: res?.response?.data?.status,
    };
  }
};

const unAuthResponse = ({ messageApi, err }) => {
  if (err?.status === 401) {
    messageApi?.open({
      key: "err_api",
      type: "error",
      content: "Login ulang",
      ...(err?.status === 401 && {
        onClose: () => {
          deleteCookie("token");
          window.location.href = "/login";
        },
      }),
      duration: 0.8,
    });
  }
};

const forbiddenResponse = ({ navigate, err }) => {
  if (err?.status == 403) {
    navigate("/unauth");
  }
};
export { responseError, responseSuccess, unAuthResponse, forbiddenResponse };
