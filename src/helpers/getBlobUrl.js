const getBlobUrl = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      resolve(URL.createObjectURL(blob));
    };

    reader.readAsArrayBuffer(file);
  });
};

export default getBlobUrl;
