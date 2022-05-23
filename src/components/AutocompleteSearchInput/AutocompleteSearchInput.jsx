import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AutocompleteSearchInput = ({ label, options, size, sx, ...props }) => (
    <Autocomplete
        blurOnSelect
        disableClearable
        autoComplete
        autoHighlight
        fullWidth
        filterOptions={(_options) => _options}
        options={options}
        {...props}
        size={size}
        sx={{ ...sx }}
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <InputAdornment position="end" sx={{ px: '0.25rem' }}>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        )}
    />
);

AutocompleteSearchInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({key: PropTypes.string, value: PropTypes.string})).isRequired,
    size: PropTypes.string,
    sx: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
};

AutocompleteSearchInput.defaultProps = {
    label: '',
    size: 'small',
    sx: {}
};

export default AutocompleteSearchInput;
