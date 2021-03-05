import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography
} from '@material-ui/core';
import { StyleSheet, View, TextInput } from 'react-native';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: '100%',
    height: theme.spacing(6)
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    borderRadius: '0px 30px 30px 0px',
    border: 'none',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    display: 'flex',
  },
}))

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    borderRadius: '50px',
    height: '100%'
  },
  input: {
    backgroundColor: '#F4F4F4',
    color: 'black',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    fontSize: '16px',
    letterSpacing: '1px',
    outline: 'none !important',
    borderWidth: '0px',
    width: '100%',
    paddingLeft: '40px'
  },
});

const SearchBar = ({createNewCard}) => {
  const classes = useStyles()
  const [url, setURL] = useState(null)

  const handleURLChange = () => {
    setURL(url)
  }

  const handleAdd = (url) => {
    createNewCard(url)
  }

  return (
    <form className={classes.form}>
      <View style={styles.view} >
        <TextInput type="text" style={styles.input}
          placeholder="Save a Job Posting URL...."
          value={url}
          onChange={handleURLChange}
        />
        <button type="button" className={classes.addButton} onClick={() => createNewCard(url)}>
          <AddIcon className={classes.addIcon}></AddIcon>
          <Typography>Add</Typography>
        </button>
      </View>
    </form>
  )
}


SearchBar.propTypes = {
  className: PropTypes.string
};

export default SearchBar;
