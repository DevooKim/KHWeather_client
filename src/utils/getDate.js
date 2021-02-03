export default function getDate(day, action) {
  const date = new Date(day);
  switch (action) {
    case "MONTH":
      return date.getMonth();
    case "DATE":
      return date.getDate();
    case "HOURS":
      return date.getHours();
    case "MINUTES":
      return date.getMinutes();
    case "DAY":
      const day = date.getDay();
      if (day === 0) return "일요일";
      if (day === 1) return "월요일";
      if (day === 2) return "화요일";
      if (day === 3) return "수요일";
      if (day === 4) return "목요일";
      if (day === 5) return "금요일";
      if (day === 6) return "토요일";
      return "error";
    case "MOBILE":
      const mDay = date.getDay();
      if (mDay === 0) return "일";
      if (mDay === 1) return "월";
      if (mDay === 2) return "화";
      if (mDay === 3) return "수";
      if (mDay === 4) return "목";
      if (mDay === 5) return "금";
      if (mDay === 6) return "토";
      return "error";

    default:
      throw new Error`Unhandled ${action}`();
  }
}
