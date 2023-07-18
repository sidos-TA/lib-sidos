const greetingHandler = () => {
  const date = new Date().getHours();

  if (date >= 2 && date <= 10) {
    return "Selamat pagi";
  } else if (date > 10 && date < 12) {
    return "Selamat pagi menjelang siang";
  } else if (date >= 12 && date < 15) {
    return "Selamat Siang";
  } else if (date >= 15 && date <= 18) {
    return "Selamat Sore";
  }
  return "Selamat Malam";
};

export default greetingHandler;
