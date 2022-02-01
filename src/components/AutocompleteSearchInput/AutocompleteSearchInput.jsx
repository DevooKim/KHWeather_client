import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';

const AutocompleteSearchInput = ({ label, options, size, sx, onInputKeyDown, ...props }) => (
    <Autocomplete
        disableClearable
        autoComplete
        autoHighlight
        filterOptions={(_options) => _options}
        options={options}
        {...props}
        size={size}
        sx={{ ...sx }}
        renderInput={(params) => (
            <TextField
                {...params}
                onKeyDown={onInputKeyDown}
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
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.string,
    onInputKeyDown: PropTypes.func,
    sx: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
};

AutocompleteSearchInput.defaultProps = {
    label: '',
    size: 'small',
    onInputKeyDown: () => {},
    sx: {}
};

export default AutocompleteSearchInput;
