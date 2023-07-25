import getCookie from "./getCookie";

const decodeCookie = (cName) => {
  const cookie = getCookie(cName);
  const dataCookie = cookie ? JSON.parse(atob(cookie?.split(".")?.[1])) : {};

  return dataCookie;
};
export default decodeCookie;
