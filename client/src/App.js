import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green  } from '@material-ui/core/colors';
import { Provider } from 'react-redux';

import Routes from './pages/Routes';
import './App.scss';

import configStore from './store/configStore';
const store = configStore();

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
