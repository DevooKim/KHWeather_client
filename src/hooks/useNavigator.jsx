import { useEffect, useState, useCallback } from 'react';
import fetchAddress from '../apis/fetchAddress';
import { useLocationActionContext } from '../contexts/locationContext';

const useNavigator = () => {
    const setLocation = useLocationActionContext();
    const [loading, setLoading] = useState(false);

    const executeNavigator = useCallback(() => {
        if ('geolocation' in navigator) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const coords = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    };
                    const address = await fetchAddress(coords);
                    console.log(address);
                    setLocation({coords, name: address}, false)
                    setLoading(false)
                },
                (error) => {
                    // console.log('error: ', error);
                    /* error.code
                        1: PERMISSION_DENIED
                        2: POSITION_UNAVAILABLE
                        3: TIMEOUT
                    */
                   setLoading(false)
                }
            );
        }
    }, []);

    useEffect(() => {
        executeNavigator()
    }, [])

    return { loading, executeNavigator };
};

export default useNavigator;
