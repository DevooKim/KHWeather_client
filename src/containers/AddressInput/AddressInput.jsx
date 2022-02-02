import React, { useState, useCallback, memo, useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash/throttle';

import { useLocationActionContext, useLocationValueContext } from '../../contexts/locationContext';
import AutocompleteSearchInput from '../../components/AutocompleteSearchInput';
import fetchCoords from '../../apis/fetchCoords';
import constants from '../../constants';
import usePrevious from '../../hooks/usePrevious';

const { LOCAL_STORAGE_KEY } = constants;

const grouped = (key, list) => list.map((l) => ({ key, value: l }));

const AddressInput = memo(() => {
    const currentPosition = useLocationValueContext();
    const lastestSearch = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const [value, setValue] = useState({ value: '' });
    const [options, setOptions] = useState([]);

    const inputRef = useRef('');
    const addressesRef = useRef({});
    const prevValue = usePrevious(currentPosition.name);

    const lastestSearchResult = useMemo(
        () => grouped('최근 검색 결과', lastestSearch),
        [lastestSearch]
    );

    const setLocation = useLocationActionContext();
    console.log('render');

    useEffect(() => {
        if (prevValue !== value.value && addressesRef.current[value?.value]) {
            setLocation({ ...addressesRef.current[value.value], name: value.value });
        }
    }, [value, addressesRef.current]);

    useEffect(() => {
        // console.log(currentPosition)
        setValue({ value: currentPosition.name });
    }, [currentPosition]);

    const fetchAddress = useCallback(
        throttle(async (_value) => {
            const result = await fetchCoords(_value);
            addressesRef.current = result;
            setOptions(grouped('검색 결과', Object.keys(result)) || []);
        }, 500),
        []
    );

    const onChange = (event, newValue) => setValue(newValue);

    const onInputChange = (event, newInputValue) => {
        if (newInputValue.trim() !== '' || newInputValue === '') {
            inputRef.current = newInputValue;
        }
        fetchAddress(newInputValue);
    };

    return (
        <AutocompleteSearchInput
            label="지역 검색"
            options={inputRef.current.length > 0 ? options : lastestSearchResult}
            groupBy={(option) => option.key}
            getOptionLabel={(option) => option.value}
            noOptionsText="검색 결과가 없습니다."
            size="small"
            onChange={onChange}
            onInputChange={onInputChange}
            value={value}
            sx={{ width: '15rem' }}
        />
    );
});

export default AddressInput;
