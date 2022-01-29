import axios from 'axios';

const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`
};

const fetchAddress = async (address) => {
    if (!address.trim().length) return [];
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
    try {
        const { data } = await axios.get(url, { headers });
        const { documents } = data;
        // return documents.map((document) => ({[document.address_name]: {x: document.x, y: document.y}}));
        return documents.reduce(
            (prev, document) => ({
                ...prev,
                [document.address_name]: { x: document.x, y: document.y }
            }),
            {}
        );
    } catch (error) {
        console.error('@@ERROR@@ fetchAddress - ', error);
    }
    return null;
};

export default fetchAddress;
