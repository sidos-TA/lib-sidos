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
  if (res?.response?.config?.responseType === "blob") {
    return {
      status: res?.response?.status,
    };
  } else {
    if (res?.status !== 200) {
      return {
        error: res?.response?.data?.error,
        status: res?.response?.data?.status,
      };
    }
  }
};

const unAuthResponse = ({ messageApi, err, isBackToLogin = true }) => {
  const { pathname } = window.location;
  messageApi?.open({
    key: `${Date.now()}_error_auth`,
    type: "error",
    content: err?.error,
    ...(err?.status === 401 && {
      onClose: () => {
        deleteCookie("token");
        if (isBackToLogin && pathname !== "/login") {
          window.location.href = "/login";
        }
      },
    }),
    duration: 0.8,
  });
};

const forbiddenResponse = ({ navigate, err }) => {
  if (err?.status == 403) {
    navigate("/unauth");
  }
};
export { responseError, responseSuccess, unAuthResponse, forbiddenResponse };
