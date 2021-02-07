export default function getDate(weekday, action) {
  switch (action) {
    case "DESKTOP":
      if (weekday === 0) return "일요일";
      if (weekday === 1) return "월요일";
      if (weekday === 2) return "화요일";
      if (weekday === 3) return "수요일";
      if (weekday === 4) return "목요일";
      if (weekday === 5) return "금요일";
      if (weekday === 6) return "토요일";
      return "error";

    case "MOBILE":
      if (weekday === 0) return "일";
      if (weekday === 1) return "월";
      if (weekday === 2) return "화";
      if (weekday === 3) return "수";
      if (weekday === 4) return "목";
      if (weekday === 5) return "금";
      if (weekday === 6) return "토";
      return "error";

    default:
      throw new Error`Unhandled ${action}`();
  }
}
