import { useEffect, useState, useCallback } from 'react';
import fetchAddress from '../apis/fetchAddress';

import { useLocationActionContext } from '../contexts/locationContext';

const defaultOption = {isManual: false}

const useNavigator = (options = defaultOption) => {
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
                    console.log('nav: ', address, coords);
                    setLocation({ coords, name: address }, false);
                    setLoading(false);
                },
                (error) => {
                    // console.log('error: ', error);
                    /* error.code
                        1: PERMISSION_DENIED
                        2: POSITION_UNAVAILABLE
                        3: TIMEOUT
                    */
                    console.log('nav error: ', error.message);
                    setLoading(false);
                },
                // {
                //     // enableHighAccuracy: true,
                //     maximumAge: 3 * 60 * 1000,
                //     timeout: 10 * 1000
                // }
            );
        }
    }, []);

    useEffect(() => {
        if(!options.isManual){
            executeNavigator();
        }
    }, []);

    return { loading, executeNavigator };
};

export default useNavigator;
