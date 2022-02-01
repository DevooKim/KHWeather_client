import React, { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';

const LocationValueContext = createContext();
const LocationActionContext = createContext();

export const useLocationValueContext = () => {
    const location = useContext(LocationValueContext);
    return location;
};

export const useLocationActionContext = () => {
    const setLocation = useContext(LocationActionContext);
    return setLocation;
};

export const LocationContext = ({ children }) => {
    const [location, setLocation] = useState({
        coords: { latitude: '126.978652258309', longitude: '37.5668' },
        name: '서울'
    });

    return (
        <LocationValueContext.Provider value={location}>
            <LocationActionContext.Provider value={setLocation}>
                {children}
            </LocationActionContext.Provider>
        </LocationValueContext.Provider>
    );
};

LocationContext.propTypes = {
    children: propTypes.node.isRequired
};
