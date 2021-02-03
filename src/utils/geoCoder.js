import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const headers = {
  Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
};

export const AddressSearch = async (address) => {
  if (address.lenght === 0) return { address_name: "검색 결과가 없습니다." };

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;

  try {
    console.log(address);
    const response = await axios.get(url, { headers });
    const data = response.data.documents;
    return data;
  } catch (e) {
    console.log(e);
    return [{ address_name: "" }];
  }
};

export const Coord2RegionCode = async (coordinate) => {
  try {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coordinate.lon}&y=${coordinate.lat}`;
    // const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.033899090337&y=37.7380566430617`;
    const response = await axios.get(url, { headers });
    const data = response.data.documents[0];
    return data.address_name;
  } catch (e) {
    console.log(e);
    return "";
  }
};
