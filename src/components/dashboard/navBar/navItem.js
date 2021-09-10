import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import {usePath} from 'hookrouter';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';

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
  button: {
    paddingLeft: '0px',
    fontSize: '1rem',
    fontWeight: '400',
    textTransform: 'none',
    lineHeight: '1',
    marginLeft: theme.spacing(2)
  },
  active: {
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    fontSize: '1rem',
    margin: '12px 0px 12px 0px',
    padding: '8px 24px 8px 24px',
    '&:hover': {
      backgroundColor: theme.palette.primary.first,

    },
    textTransform: 'none',
    
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
  console.log("/app/dashboard/" + title)

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      {"/app/dashboard/" + title === window.location.pathname.replace("%20", " ") ? 
        <Button
          // activeclassname={classes.active}
          className={classes.active}
          component={RouterLink}
          to={href}
        >
          {/* {Icon && (
            <Icon
              className={classes.icon}
              size="20"
            />
          )} */}
          <span className={classes.title}>
            {title}
          </span>
        </Button> : 
        <Button
          // activeclassname={classes.active}
          className={classes.button}
          component={RouterLink}
          to={href}
        >
          {/* {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
          )} */}
          <span className={classes.title}>
            {title}
          </span>
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
