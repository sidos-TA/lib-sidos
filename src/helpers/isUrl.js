const isUrl = (string) => {
  const regexUrl = /^(http|https):\/\/([\w-]+(\.[\w-]+)*\/?)([^\s]*)$/;
  return regexUrl.test(string);
};
export default isUrl;
