import React from 'react';
import DashboardLayout from './components/dashboard/index.js';
import MainLayout from './components/mainContent/index.js';
import AccountView from './views/account/AccountView';
import JobListView from './views/jobs/JobListView';
import SignIn from './views/auth/signin';
import NotFoundView from './views/errors/NotFoundView';
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
      { path: '*', element: <NotFoundView />}
    ]
  },
  {
    path: 'asdasdas',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <SignIn /> },
      { path: 'register', element: <SignUp /> },
      { path: 'logout', element: <SignOut /> },
      { path: 'passwordreset', element: <PasswordReset /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <SignIn /> },
    ]
  },
];

export default routes;