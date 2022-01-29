import { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const GeoNavigation = ({ pos}) => {
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

GeoNavigation.propTypes = {
    pos: propTypes.shape({
        coords: propTypes.shape({
            latitude: propTypes.string,
            longitude: propTypes.string
        })
    })
};

GeoNavigation.defaultProps = {
    pos: {}
}

export default GeoNavigation;
