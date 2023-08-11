import basePathName from "../constants/basePathName";
import {
  forbiddenResponse,
  responseError,
  unAuthResponse,
} from "./formatRespons";

const catchHandler = ({ e, messageApi, navigate }) => {
  const err = responseError(e);

  const isDev = import.meta.env?.DEV || import.meta.env?.MODE === "development";

  if (err?.status === 401) {
    unAuthResponse({ err, messageApi });
  } else if (err?.status === 403) {
    forbiddenResponse({ navigate, err });
  } else if (err?.status === 404) {
    messageApi.open({
      type: "error",
      key: `${Date.now()}_error`,
      content: err?.error || "Data tidak ada",
      onClose: () => {
        navigate(basePathName);
      },
      duration: 0.5,
    });
  } else {
    // matikan sewaktu ke production
    if (isDev) {
      messageApi.open({
        type: "error",
        key: `${Date.now()}_error_key`,
        content: err?.error || "Error",
      });
    }
  }
};

export default catchHandler;
