import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import NavItem from './navItem';
import { ReactComponent as Logo } from '../../../assets/Logo.svg'

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: theme.spacing(28)
  },
  desktopDrawer: {
    width: theme.spacing(28),
    borderRight: 0,
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  allPostingsButton: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.text.grayOne,
    },
    textTransform: 'none',
    width: '160px',
    justifyContent: 'left',
    fontWeight: '700'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'medium',
    letterSpacing: '0.1px'
  },
  navItem: {
    color: theme.palette.black,
    fontWeight: theme.typography.fontWeightRegular,
    width: '160px',
    textTransform: 'none',
    justifyContent: 'left'
  },
  tags: {
    letterSpacing: '0.2px',
    color: theme.palette.text.grayThree,
    fontSize: '0.9rem'
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
        ml={2.5} 
        component={RouterLink}
        to={'/app/dashboard'}>
      <Logo />
      </Box>
      {window.location.pathname === '/app/dashboard' ?
        <Box p={1}
          mb={5}
          ml={3.5}>
          <Button
            className={classes.allPostingsButton}
            component={RouterLink}
            to={'/app/dashboard'}
          >
            <ViewListIcon />
            <Box ml={1}>
              <Typography className={classes.title}>
                All Postings
              </Typography>
            </Box>
          </Button>
        </Box> :
        <Box p={1}
        mb={5}
        ml={3.5}>
        <Button
          className={classes.navItem}
          component={RouterLink}
          to={'/app/dashboard'}
        >
          <ViewListIcon />
          <Box ml={1}>
            <Typography className={classes.title}>
              All Postings
            </Typography>
          </Box>
        </Button>
      </Box>
      }
      <Box
        ml={5}
      >
        <Box>
          <Typography className={classes.tags}>CATEGORY TAGS</Typography>
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
