import axios from "axios";

const headers = {
  Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
};

export const AddressSearch = async (address, setAddress) => {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;

  try {
    const response = await axios.get(url, { headers });
    const data = response.data.documents;
    if (data.length === 0) {
      setAddress([{ address_name: "검색 결과가 없습니다." }]);
    } else {
      setAddress([...response.data.documents]);
    }
  } catch (e) {
    console.log(e);
  }
};
