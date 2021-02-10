export default function getUvi(uvi) {
  if (uvi <= 2) return "낮음";
  else if (uvi <= 5) return "보통";
  else if (uvi <= 7) return "높음";
  else if (uvi <= 10) return "매우 높음";
  else return "위험";
}
