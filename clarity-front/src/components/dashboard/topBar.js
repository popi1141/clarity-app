import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './searchBar.js';
//import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1} >
          <Box mt={3} ml={10} mr={10}>
            <RouterLink to="/">
              Clarity
            </RouterLink>
          </Box>
          <SearchBar />
        </Box>

        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
