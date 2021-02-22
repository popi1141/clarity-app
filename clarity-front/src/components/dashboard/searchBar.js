import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px',
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '1000px'

  }
}));

const SearchBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box maxWidth={1000}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search product"
          variant="outlined"
          className={classes.input}
        />
      </Box>
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string
};

export default SearchBar;
