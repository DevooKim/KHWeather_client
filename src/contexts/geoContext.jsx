import React, { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';

const GeoValueContext = createContext();
const GeoActionContext = createContext();

export const useGeoValueContext = () => {
    const geo = useContext(GeoValueContext);
    return geo;
};

export const useGeoActionContext = () => {
    const setGeo = useContext(GeoActionContext);
    return setGeo;
};

export const GeoContext = ({ children }) => {
    const [geo, setGeo] = useState({});
    console.log('geo: ', geo)
    return (
        <GeoValueContext.Provider value={geo}>
            <GeoActionContext.Provider value={setGeo}>{children}</GeoActionContext.Provider>
        </GeoValueContext.Provider>
    );
};

GeoContext.propTypes = {
    children: propTypes.node.isRequired
};
