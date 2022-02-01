import axios from 'axios';

const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`
};

const fetchCoords = async (address) => {
    if (!address.trim().length) return {};
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
    try {
        const { data } = await axios.get(url, { headers });
        const { documents } = data;

        return documents.reduce(
            (prev, document) => ({
                ...prev,
                [document.address_name]: {coords: { latitude: document.x, longitude: document.y }}
            }),
            {}
        );
    } catch (error) {
        console.error('@@ERROR@@ fetchCoords - ', error);
    }
    return null;
};

export default fetchCoords;
