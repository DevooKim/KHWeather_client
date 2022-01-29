import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useGeoSearchParams = ({ pos = {} }) => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const { latitude, longitude } = pos.coords || {};

    useEffect(() => {
        if (latitude && longitude) {
            setSearchParams({ latitude, longitude });
        }
    }, [latitude, longitude]);

    return null;
};

export default useGeoSearchParams;
