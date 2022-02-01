import React, { useState, useCallback, memo, useEffect } from 'react';
import throttle from 'lodash/throttle';

import { useLocationActionContext } from '../../contexts/locationContext';
import AutocompleteSearchInput from '../../components/AutocompleteSearchInput';
import fetchCoords from '../../apis/fetchCoords';
import usePrevious from '../../hooks/usePrevious';

const AddressInput = memo(() => {
    const [value, setValue] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [options, setOptions] = useState([])
    const setLocation = useLocationActionContext();
    const prevValue = usePrevious(value);

    useEffect(() => {
        if (prevValue !== value && addresses[value]) {
            setLocation({ ...addresses[value], name: value });
        }
    }, [value, addresses]);

    const fetchAddress = useCallback(
        throttle(async (_value) => {
            const result = await fetchCoords(_value);
            setAddresses(result);
        }, 500),
        []
    );

    const onChange = (event, newValue) => setValue(newValue);

    const onInputChange = (event, newInputVale) => fetchAddress(newInputVale);

    // const onInputKeyDown = (e) => {
    //     // if (e.keyCode === 13 && prevValue !== value && addresses[value]) {
    //     if (e.keyCode === 13) {
    //         console.log(prevValue, value, addresses[value])
    //         // console.log('submit: ', e.target.value, value);
    //         // setLocation({ ...addresses[value], name: value });
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
