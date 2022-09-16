const getCurrentDate = () => {
  const date = new Date();
  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  let currentHours = date.getHours();
  currentHours = currentHours < 10 ? `0${currentHours}` : currentHours;
  let currentMinutes = date.getMinutes();
  currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  let currentSeconds = date.getSeconds();
  currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
  const currentTime = `${
    currentHours < 13 ? currentHours : currentHours - 12
  }:${currentMinutes}:${currentSeconds} ${currentHours < 13 ? "AM" : "PM"}`;
  return `${currentDate}, ${currentTime}`;
};

export { getCurrentDate };
