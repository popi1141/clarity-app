import logo from './logo.svg';
import './App.css';
import SignIn from "./components/user/signin.js";
import SignUp from "./components/user/signup.js";
import SignOut from "./components/user/signout.js";
import PasswordReset from "./components/user/passwordreset.js";
import { useFirebaseApp } from 'reactfire';
import { useUser } from 'reactfire';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from "./components/dashboard/dashboard.js";

function App() {
  // const firebase = useFirebaseApp();
  // console.log(firebase);
  const user = useUser();
  console.log(user);

  const classes = useStyles();

  return (

      <div className="App">
        <div className={classes.appRoute}>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/passwordReset" component={PasswordReset} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/signout" component={SignOut} />
            </Switch>
        </div>
      </div>
  );
}

const useStyles = makeStyles((theme) => ({

}))

export default App;
