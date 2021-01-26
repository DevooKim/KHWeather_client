import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const headers = {
  Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
};

export const AddressSearch = async (address) => {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;

  const response = await axios.get(url, { headers });

  const data = response.data.documents[0];
  return { lat: data.y, lon: data.x };
};

export const Coord2RegionCode = async (coord) => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coord.lon}&y=${coord.lat}`;
  // const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.033899090337&y=37.7380566430617`;
  const response = await axios.get(url, { headers });

  const data = response.data.documents[0];
  return data.address_name;
};
