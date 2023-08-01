const isStringParseArray = (str) => {
  const regex = /^\s*\[\s*("[^"]*"\s*,\s*)*("[^"]*"\s*)\]\s*$/;
  return regex.test(str);
};

export default isStringParseArray;
