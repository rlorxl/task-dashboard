import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import theme from './styled/color';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../src/store/auth-context';
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
