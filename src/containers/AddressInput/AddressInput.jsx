import React, { useState, useCallback, memo } from 'react';
import debounce from 'lodash/debounce';

import AutocompleteSearchInput from '../../components/AutocompleteSearchInput';
import _fetchAddress from '../../apis/fetchAddress';

const AddressInput = memo(() => {
    const [value, setValue] = useState('');
    const [addresses, setAddresses] = useState([]);

    const fetchAddress = useCallback(
        debounce(async (_value) => {
            const result = await _fetchAddress(_value);
            console.log(Object.keys(result));
            setAddresses(result);
        }, 400),
        []
    );

    const onChange = (event, newValue) => setValue(newValue);

    const onInputChange = (event, newInputVale) => fetchAddress(newInputVale);

    const onInputKeyDown = (e) => {
        if (e.keyCode === 13 && e.target?.value === value) {
            console.log('submit: ', e.target.value, value);
            // change query
        }
    };

    const onSubmit = () => {
        // changfe query
        console.log('button submit: ', value);
    };

    return (
        <AutocompleteSearchInput
            label="지역 검색"
            options={Object.keys(addresses)}
            noOptionsText="검색 결과가 없습니다."
            size="small"
            onChange={onChange}
            onInputChange={onInputChange}
            onInputKeyDown={onInputKeyDown}
            onIconClick={onSubmit}
            sx={{ width: '15rem' }}
        />
    );
});

export default AddressInput;
