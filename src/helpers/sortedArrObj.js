const sortedArrObj = ({ arrDatas, key, sortType = "ASC" }) => {
  return arrDatas.sort((a, b) => {
    if (a?.[key] > b?.[key]) {
      return sortType === "ASC" ? 1 : -1;
    } else if (a?.[key] < b?.[key]) {
      return sortType === "ASC" ? -1 : 1;
    }
    return 0;
  });
};
export default sortedArrObj;
