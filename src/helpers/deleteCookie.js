const deleteCookie = (cName) => {
  document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default deleteCookie;
