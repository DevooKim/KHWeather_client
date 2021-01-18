export const getDate = (day, action) => {
  const date = new Date(day);
  switch (action) {
    case "MONTH":
      return date.getMonth();
    case "DATE":
      return date.getDate();
    case "HOURS":
      return date.getHours();
    case "MINUTUES":
      return date.getMinutes();
    default:
      throw new Error`Unhandled ${action}`();
  }
};
