import * as Types from './types';



export function userLoggedIn(user) {
  return {
    type: Types.USER_LOGGED_IN,
    user
  }
}
export function userLoggedOut(user) {
  return {
    type: Types.USER_LOGGED_OUT
  }
}


export const userLogin = user => dispatch => {
  dispatch(userLoggedIn(user))
  localStorage.user = JSON.stringify(user)
}

export const userLogout = () => dispatch => {
  dispatch(userLoggedOut())
  localStorage.removeItem('user')

}