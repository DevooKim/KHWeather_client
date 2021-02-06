import getHourIndex from "./getHourIndex";
export default function stateText(hour, temp) {
  const { yesterdayTemps, todayTemps } = temp;
  const hourIndex = getHourIndex(hour);
  const diffTemp = yesterdayTemps[hourIndex] - todayTemps[hourIndex];

  if (diffTemp < 0) {
    return `어제보다 ${Math.abs(diffTemp)}도 높습니다.`;
  } else if (diffTemp > 0) {
    return `어제보다 ${Math.abs(diffTemp)}도 낮습니다.`;
  } else {
    return `현재 기온은 어제와 동일합니다.`;
  }
}
