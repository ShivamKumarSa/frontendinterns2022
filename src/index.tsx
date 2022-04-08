import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './hooks/useAuth';
import theme from './styles/theme';
import './App.css';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
