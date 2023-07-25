const sameArrObj = ({ arr = [], props }) => [
  ...new Map(arr?.map((item) => [item[props], item])).values(),
];

export default sameArrObj;
