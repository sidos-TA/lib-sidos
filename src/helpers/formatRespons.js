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
    };
  }
};
export { responseError, responseSuccess };
