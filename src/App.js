import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import theme from './theme';
import DashboardLayout from './components/dashboard/index.js';
import MainLayout from './components/mainContent/index.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>

        <BrowserRouter>
          <Switch>
          <Route path='/app/*' component={DashboardLayout} />
            <Route path='/*' component={MainLayout} />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>

    </ThemeProvider>
  );
};

export default App;

