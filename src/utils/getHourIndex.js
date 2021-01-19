export default function setHourIndex(now) {
  return Math.ceil((now % 24) / 3) % 8;
}
