import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import SignIn from '../../views/auth/signin';
import SignUp from '../../views/auth/signup';
import SignOut from '../../views/auth/signout';
import PasswordReset from '../../views/auth/passwordreset';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route exact path="/"  >
                <SignIn />
              </Route>
              <Route path="/login" >
                <SignIn />
              </Route>
              <Route path="/logout"  >
                <SignOut />
              </Route>
              <Route path="/passwordReset"  >
                <PasswordReset />
              </Route>
              <Route path="/signup" >
                <SignUp />
              </Route>
              {/* <Route path="*" component={<NotFoundView />} > 
                <NotFoundView />
              </Route> */}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
