import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Button,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/Logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    position: 'fixed'
  },
  logo: {
        maxWidth: 40,
        marginRight: '10px'
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  loginButton: {
    color: 'black',
    textTransform: 'none',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.primary.main
    }
  },
  startButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '50px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.root} elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
            </IconButton>
            <Logo/>
            <div className={classes.toolbarButtons}>
              <Button component={RouterLink} className={classes.loginButton} to="/login">Login</Button>
              <Button component={RouterLink} className={classes.startButton} to="/signup">Start For Free</Button>
            </div>
          </Toolbar>
      </AppBar>
      <Toolbar/>
    </React.Fragment>
  );
};

export default TopBar;
