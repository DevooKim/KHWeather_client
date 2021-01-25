export default function getHourIndex(hour, min = 0, offset = false) {
  if (!offset) {
    return Math.ceil((hour % 24) / 3) % 8;
  }

  const index = Math.ceil((hour % 24) / 3) % 8;
  const key = index * 3;

  if (hour - key === 0) {
    return index;
  } else if (hour - key === 1 && min <= 30) {
    return index;
  }
  return index + 1;
}
