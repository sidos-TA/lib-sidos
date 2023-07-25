const setCookie = (cName, cValue, expirySecond) => {
  let date = new Date();
  date.setTime(date.getTime() + expirySecond);
  const expires = "expires=" + date.toUTCString();
  // document.cookie = `${cName}=${cValue};secure;${expires}path=/`;
  document.cookie = `${cName}=${cValue};secure;path=/`;
};
export default setCookie;
