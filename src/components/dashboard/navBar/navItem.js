import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import {usePath} from 'hookrouter';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  navItem: {
    color: theme.palette.black,
    fontWeight: theme.typography.fontWeightRegular,
    width: '160px',
    textTransform: 'none',
    fontSize: '1rem',
    justifyContent: 'left',
    lineHeight: '0.7'
  },
  check: {
    opacity: '0'
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.text.grayOne,
    },
    textTransform: 'none',
    width: '160px',
    fontWeight: '700',
    lineHeight: '0.7',
    justifyContent: 'left'
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const path = usePath();
  console.log("nav item path: ", path)
  // console.log("/app/dashboard/" + title)

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      {"/app/dashboard/" + title === window.location.pathname.replace("%20", " ") ? 
        <Button
          className={classes.active}
          component={RouterLink}
          to={href}
        >
          <CheckIcon />
          <Box ml={1}>
            <span className={classes.title}>
              {title}
            </span>
          </Box>
        </Button> : 
        <Button
          component={RouterLink}
          to={href}
          className={classes.navItem}
        >
          <CheckIcon className={classes.check}/>
          <Box ml={1}>
            <span className={classes.title}>
              {title}
            </span>
          </Box>
        </Button>
        }
      
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
