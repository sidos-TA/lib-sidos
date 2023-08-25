const isIncludeEmot = (str) => {
  const pattern =
    // /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gu;
    /(?:[\u00a9\u00ae]|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])(?![\u002D\u2013\u2014\u2015\u2212])/gu;
  return pattern.test(str);
};
export default isIncludeEmot;
