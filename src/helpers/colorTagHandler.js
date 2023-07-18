const colorTagHandler = (record) => {
  let color;
  if (record) {
    if (record === "terima") color = "green";
    else if (record === "tolak") color = "red";
    else if (record === "usulan") color = "yellow";
    else if (record === "belum mengajukan") color = "grey";
  }

  return color;
};

export default colorTagHandler;
