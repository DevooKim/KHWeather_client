import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useGeoSearchParams = ({ coords = {} }) => {
    console.log('useGeoSearch: ', coords)
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const { latitude, longitude } = coords || {};
    const qLatitude = searchParams.get('latitude')
    const qLongitude = searchParams.get('longitude')
    console.log(qLatitude, qLongitude)
    useEffect(() => {
        if (latitude && longitude) {
            console.log('search')
            setSearchParams({ latitude, longitude });
        }
    }, [latitude, longitude]);

    return null;
};

export default useGeoSearchParams;
