import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
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
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeight
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
  // active: {
  //   color: theme.palette.primary.main,
  //   '& $title': {
  //     fontWeight: theme.typography.fontWeightMedium
  //   },
  //   '& $icon': {
  //     color: theme.palette.primary.main
  //   }
  // }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
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
