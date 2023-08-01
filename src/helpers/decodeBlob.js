const decodeBlob = (blob, isImage = true) => {
  // Ubah array byte dari buffer menjadi Uint8Array
  const byteArray = new Uint8Array(blob?.data);

  if (isImage) {
    // // Konversi Uint8Array ke string menggunakan TextDecoder
    const decoder = new TextDecoder();
    const decodeURL = decoder.decode(byteArray);

    return decodeURL;
  } else {
    // Konversi Uint8Array ke base64 string
    const base64String =
      "data:application/pdf;base64," +
      btoa(String.fromCharCode.apply(null, byteArray));
    return base64String;
  }
};
export default decodeBlob;
