import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import theme from './theme';
import { LastLocationProvider } from 'react-router-last-location';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LastLocationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Provider store={store}>
              <App />
            </Provider>
          </CssBaseline>
        </ThemeProvider>
      </LastLocationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
