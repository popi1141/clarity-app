import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import SignIn from '../../views/auth/signin';
import NotFoundView from '../../views/errors/NotFoundView';
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
              <Route path="/" component={<SignIn />} >
                <SignIn />
              </Route>
              <Route path="/logout" component={<SignOut />} >
                <SignOut />
              </Route>
              <Route path="/passwordReset" component={<PasswordReset />} >
                <PasswordReset />
              </Route>
              <Route path="/signup" component={<SignUp />} >
                <SignUp />
              </Route>
              <Route path="*" component={<NotFoundView />} > 
                <NotFoundView />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
