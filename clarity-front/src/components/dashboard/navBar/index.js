import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Icon,
  SvgIcon
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './navItem';
import Logo from '../../../assets/claritylogo.png';


const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    title: 'UX Jobs'
  },
  {
    href: '/app/dashboard',
    title: 'Dev Jobs'
  },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: theme.spacing(32)
  },
  desktopDrawer: {
    width: theme.spacing(32),
    borderRight: 0,
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '70%',
    maxHeight: '70%',
    marginLeft: '15%',
    marginTop: '10%'
  },
  bold: {
    fontWeight: 600
  },
  allPostingButton: {
    borderRadius: '30px',
    fontWeight: 600,
    width: '100%',
    marginBottom: '50px'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      boxShadow={0}
    >
      <Box>
        <a href="/app/dashboard/">
          <img src={Logo} className={classes.logo} alt="logo"/>
        </a>
      </Box>
      <Box p={2}>
        <Button variant="contained" color="primary" href="/app/dashboard/" className={classes.allPostingButton}>
          All Postings
        </Button>
        <Typography className={classes.bold}> 
          My Tags
        </Typography>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
