import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/dashboard/index.js';
import MainLayout from './components/mainContent/index.js';
import AccountView from './views/account/AccountView';
import JobListView from './views/jobs/JobListView';
import DashboardView from './views/reports/DashboardView';
import SignIn from './views/auth/signin';
import NotFoundView from './views/errors/NotFoundView';
//import ProductListView from './views/product/ProductListView';
import SignUp from './views/auth/signup';
import SettingsView from './views/settings/SettingsView';
import SignOut from './views/auth/signout';
import PasswordReset from './views/auth/passwordreset';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <JobListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <SignIn /> },
      { path: 'register', element: <SignUp /> },
      { path: 'logout', element: <SignOut /> },
      { path: 'passwordreset', element: <PasswordReset /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;