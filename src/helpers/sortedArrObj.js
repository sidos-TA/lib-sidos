const sortedArrObj = ({ arrDatas, key }) => {
  return arrDatas.sort((a, b) => {
    if (a?.[key] < b?.[key]) {
      return 1;
    }
    if (a?.[key] > b?.[key]) {
      return -1;
    }
    return 0;
  });
};
export default sortedArrObj;
