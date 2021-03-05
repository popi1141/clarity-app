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
import { ReactComponent as Logo } from '../../../assets/Logo.svg'
//import Logo from '../../../assets/claritylogo.png';


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
  allPostingsButton: {
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    padding: '12px 48px 12px 24px',
    '&:hover': {
      backgroundColor: theme.palette.primary.first,

    },
    textTransform: 'none',
    
  },
  title: {
    fontSize: '20px',
    fontWeight: 'medium',
    letterSpacing: '0.1px',
  },
  navItem: {
    color: theme.palette.black,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    textTransform: 'none',
    width: '100%',
  },
  tags: {
    letterSpacing: '0.2px'
  },
  navItems: {
    textAlign: 'left'
  }
}));

const NavBar = ({ onMobileClose, openMobile, boards }) => {
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
      <Box p={2}
        mt={2.5}
        mb={5}
        ml={2.5}>
        <Logo />
      </Box>
      <Box p={2}
        mb={5}
        ml={2}
        mr={3}>
        <Button
          activeClassName={classes.active}
          className={classes.allPostingsButton}
          component={RouterLink}
          to={'/app/dashboard'}
        >
          <Typography className={classes.title}>
            All Postings
        </Typography>
        </Button>

      </Box>
      <Box
        ml={7}
      >
        <Box
        mb={2}
        >
          <Typography variant="h3" className={classes.tags}>MY TAGS</Typography>
        </Box>
        <Box
          mb={2}
          className={classes.navItems}
        >
          <List>
            {boards.map((item) => (
              <NavItem
                className={classes.navItem}
                href={item.href}
                key={item.title}
                title={item.title}
              />
            ))}
          </List>
        </Box>

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
