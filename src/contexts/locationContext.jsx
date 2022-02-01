import React, { createContext, useCallback, useContext, useState } from 'react';
import propTypes from 'prop-types';
import constants from '../constants';

const { LOCAL_STORAGE_KEY } = constants;

const LocationValueContext = createContext();
const LocationActionContext = createContext();

export const useLocationValueContext = () => {
    const value = useContext(LocationValueContext);
    return value;
};

export const useLocationActionContext = () => {
    const action = useContext(LocationActionContext);
    return action;
};

const storeStorage = (value) => {
    const prev = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const index = prev.indexOf(value);
    if (index > -1) {
        prev.splice(index, 1); // 2nd parameter means remove one item only
    }
    if (prev.length > 4) prev.pop();
    prev.unshift(value);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prev));
};

export const LocationContext = ({ children }) => {
    const [location, setLocation] = useState({
        coords: { longitude: '126.978652258309', latitude: '37.5668' },
        name: '서울'
    });

    const setLocationAndStore = useCallback((value, useStore = true) => {
        if (useStore) storeStorage(value.name);
        setLocation(value);
    }, []);

    return (
        <LocationValueContext.Provider value={ location }>
            <LocationActionContext.Provider
                value={setLocationAndStore}
            >
                {children}
            </LocationActionContext.Provider>
        </LocationValueContext.Provider>
    );
};

LocationContext.propTypes = {
    children: propTypes.node.isRequired
};
