import React, { createContext, useCallback, useContext, useState } from 'react';
import propTypes from 'prop-types';

const LocationValueContext = createContext();
const LocationActionContext = createContext();
const localStorageKey = 'searchLocation'

export const useLocationValueContext = () => {
    const location = useContext(LocationValueContext);
    return location;
};

export const useLocationActionContext = () => {
    const setLocation = useContext(LocationActionContext);
    return setLocation;
};

const storeStorage = (value) => {
    const prev = JSON.parse(localStorage.getItem(localStorageKey)) || []
    if(prev.length > 4) prev.shift()
    prev.push(value)
    localStorage.setItem(localStorageKey, JSON.stringify(prev))

}

export const LocationContext = ({ children }) => {
    const [location, setLocation] = useState({
        coords: { latitude: '126.978652258309', longitude: '37.5668' },
        name: '서울'
    });

    const setLocationAndStore = useCallback((value, useStore = true) => {
        if (useStore) storeStorage(value.name);
        setLocation(value);
    }, []);

    return (
        <LocationValueContext.Provider value={location}>
            <LocationActionContext.Provider value={setLocationAndStore}>
                {children}
            </LocationActionContext.Provider>
        </LocationValueContext.Provider>
    );
};

LocationContext.propTypes = {
    children: propTypes.node.isRequired
};
