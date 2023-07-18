const getRandomNumber = () => {
  const minBrightness = 128; // batas kecerahan minimum (0-255)
  return Math.floor(Math.random() * (256 - minBrightness)) + minBrightness;
};

// Fungsi untuk menghasilkan warna acak dalam format hex
const randomColors = () => {
  // Menghasilkan tiga komponen warna merah, hijau, dan biru secara acak
  //   var red = getRandomNumber().toString(16).padStart(2, "0");
  var red = 0;
  //   var green = getRandomNumber().toString(16).padStart(2, "0");
  var green = 0;
  var blue = getRandomNumber().toString(16).padStart(2, "0");

  // Menggabungkan ketiga komponen warna menjadi format hex
  var color = "#" + red + green + blue;

  return color;
};

export default randomColors;
