import setHourIndex from "../../utils/getHourIndex";
export default function StateText({ hour, yesterdayTemps, todayTemps }) {
  const hourIndex = setHourIndex(hour);
  const diffTemp = yesterdayTemps[hourIndex] - todayTemps[hourIndex];

  if (diffTemp < 0) {
    return <h1>어제보다 {Math.abs(diffTemp)}도 높습니다.</h1>;
  } else if (diffTemp > 0) {
    return <h1>어제보다 {Math.abs(diffTemp)}도 낮습니다.</h1>;
  } else {
    return <h1>현재 기온은 어제와 동일합니다.</h1>;
  }
}
