import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`
};

const fetchAddress = async (coords) => {
    if (isEmpty(coords)) return '';
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coords.longitude}&y=${coords.latitude}`;
    try {
        const { data } = await axios.get(url, { headers });
        const { documents } = data;

        return documents[0].address_name
    } catch (error) {
        console.error('@@ERROR@@ fetchAddress - ', error);
    }
    return null;
};

export default fetchAddress;
