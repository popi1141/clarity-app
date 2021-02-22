import logo from './logo.svg';
import './App.css';
import routes from './routes.js';
import { ThemeProvider } from '@material-ui/core';
import { useRoutes } from 'react-router-dom';
import theme from './theme';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
  );
};

export default App;
