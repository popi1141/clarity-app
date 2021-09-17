import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Avatar,
  makeStyles,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import AddBar from './addBar.js';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    marginLeft: '10%'
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  searchIcon: {
    color: 'gray'
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    borderRadius: '30px 30px 30px 30px',
    textTransform: 'none',
    border: 'none',
    display: 'flex',
    '&:hover': {
      backgroundColor: theme.palette.primary.first,
    },
    height: theme.spacing(6),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontSize: '18px',
    letterSpacing: '0px',
    boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.1)',
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  createNewCard,
  ...rest
}) => {
  const classes = useStyles();
  //const [notifications] = useState([]);

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
  };

  const [showAddButton, toggleshowAddButton] = useState(true)
  const handleAddButton = () => {
    toggleshowAddButton(!showAddButton)
  }
  

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={clsx(classes.root, className)}>
        <Box display="flex" justifyContent="flex-end" mt={4} mb={4} ml='5%' mr='5%' flexGrow={1}>
          {showAddButton ?
            null :
            <AddBar 
            createNewCard={createNewCard}
            handleAddButton={handleAddButton}
            />
          }
          {
          showAddButton ? 
          <Button onClick={handleAddButton} className={classes.addButton}><AddIcon marginRight='12px' ></AddIcon>Save a Job</Button>
          :
          null
          }
        </Box>

        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/app/account"
          />
          <IconButton color="inherit"
            component={RouterLink}
            to="/logout">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
