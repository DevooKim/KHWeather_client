export default function getHourIndex(hour, min = 0, offset = false) {
  if (!offset) {
    return Math.ceil((hour % 24) / 3) % 8;
  }

  const index = Math.ceil((hour % 24) / 3) % 8;
  const key = index * 3;

  if (key - hour === 2 && min <= 30) {
    return index - 1;
  }
  return index;
}
