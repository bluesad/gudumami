import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

import './index.scss';
// import App from './App';
import Pricing from './pages/Pricing';
// import DrawerDemo from './components/DrawerDemo';
import * as serviceWorker from './serviceWorker';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, zhCN);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Pricing />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
