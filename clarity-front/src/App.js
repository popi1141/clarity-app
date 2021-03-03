import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes.js';
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
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainLayout} />
            <Route path='/app/*' component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>

    </ThemeProvider>
  );
};

export default App;

