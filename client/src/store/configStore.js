import {} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { userLoggedIn, userLoggedOut } from '../actions/users';

import Api from '../api';

export default function configStore() {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk, createLogger))
  )


  if(localStorage.user) {
    // store.dispatch( userLoggedIn(JSON.parse(localStorage.user)))
    
    Api.checkLogin()
    .then(res => {
      store.dispatch( userLoggedIn(JSON.parse(localStorage.user)))
    })
    .catch(error=>{
      localStorage.clear()
      store.dispatch( userLoggedOut())
      window.location = "/";
    })
  }

  return store
}
