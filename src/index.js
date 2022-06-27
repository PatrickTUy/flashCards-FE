import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';


const theme = createTheme({
  palette:{
    primary:{
      main:"#fefefe"
    },
   }
})
const httpLink = createHttpLink({
  uri: 'https://new-flashcard-app.herokuapp.com/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const client = new ApolloClient({
  // uri: httpLink,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
               <App />
        </ThemeProvider>
    </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
