import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Button
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
    textTransform: 'none',
    border: 'none',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    display: 'flex',
    '&:hover': {
      backgroundColor: theme.palette.primary.first,

    }
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
    outline: 'none !important',
    borderWidth: '0px',
    width: '100%',
    paddingLeft: '40px'
  },
});

const AddBar = ({createNewCard},) => {
  const classes = useStyles()
  const [url, setURL] = useState(null)

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }
  
  return (
    <form className={classes.form}>
      <View style={styles.view} >
        <TextInput type="text" style={styles.input}
          placeholder="Save a Job Posting URL...."
          value={url}
          onChange={handleURLChange}
        />
        <Button type="button" className={classes.addButton} onClick={() => createNewCard(url)}>
          <AddIcon className={classes.addIcon}></AddIcon>
          <Typography>Add</Typography>
        </Button>
      </View>
    </form>
  )
}


AddBar.propTypes = {
  className: PropTypes.string
};

export default AddBar;
