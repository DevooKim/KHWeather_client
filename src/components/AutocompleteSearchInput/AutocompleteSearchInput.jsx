import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@material-ui/core';

const filterOptions = createFilterOptions({
    trim: true,
    stringify: (option) => option.replace(/\s/g, '')
});

const AutocompleteSearchInput = ({
    label,
    options,
    size,
    sx,
    onInputKeyDown,
    onIconClick,
    ...props
}) => (
    <Autocomplete
        freeSolo
        disableClearable
        autoComplete
        autoHighlight
        filterOptions={filterOptions}
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
                            <IconButton onClick={onIconClick}>
                                <SearchIcon />
                            </IconButton>
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
    onIconClick: PropTypes.func,
    sx: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
};

AutocompleteSearchInput.defaultProps = {
    label: '',
    size: 'small',
    onInputKeyDown: () => {},
    onIconClick: () => {},
    sx: {}
};

export default AutocompleteSearchInput;
