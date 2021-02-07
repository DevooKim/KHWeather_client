const parseForecasts = (days) => {
  const dt = [];
  days.dt.forEach((day) => {
    dt.push([`${day.months + 1}월 ${day.date}일`, `${day.hours}시`]);
  });

  return { ...days, dt };
};

export default parseForecasts;
