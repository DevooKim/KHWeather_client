import React, { useState, useCallback, memo, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { useGeoActionContext } from '../../contexts/geoContext';
import AutocompleteSearchInput from '../../components/AutocompleteSearchInput';
import _fetchAddress from '../../apis/fetchAddress';
import usePrevious from '../../hooks/usePrevious';

const AddressInput = memo(() => {
    const [value, setValue] = useState('');
    const [addresses, setAddresses] = useState([]);
    const setGeo = useGeoActionContext();
    const prevValue = usePrevious(value);

    useEffect(() => {
        if (prevValue !== value) {
            setGeo({ ...addresses[value], name: value });
        }
    }, [value, addresses]);

    const fetchAddress = useCallback(
        debounce(async (_value) => {
            const result = await _fetchAddress(_value);
            setAddresses(result);
        }, 400),
        []
    );

    const onChange = (event, newValue) => setValue(newValue);

    const onInputChange = (event, newInputVale) => fetchAddress(newInputVale);

    // const onInputKeyDown = (e) => {
    //     if (e.keyCode === 13 && e.target?.value === value) {
    //         console.log('submit: ', e.target.value, value);
    //         // change query
    //     }
    // };

    return (
        <AutocompleteSearchInput
            label="지역 검색"
            options={Object.keys(addresses)}
            noOptionsText="검색 결과가 없습니다."
            size="small"
            onChange={onChange}
            onInputChange={onInputChange}
            // onInputKeyDown={onInputKeyDown}
            sx={{ width: '15rem' }}
        />
    );
});

export default AddressInput;
