const isIncludeEmot = (str) => {
  const pattern =
    /(?:[\u2700-\u27BF]|[\uD83C-\uDBFF\uDC00-\uDFFF\u263A\u263B])/gu;

  return pattern.test(str);
};
export default isIncludeEmot;
