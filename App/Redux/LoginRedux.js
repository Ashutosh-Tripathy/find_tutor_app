import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AsyncStorage, ToastAndroid } from 'react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: [],
  loginSuccess: ['login'],
  loginFailure: null
})

export const LoginTypes = Types
export default Creators

async function storeToken(token) {
  try {
    await AsyncStorage.setItem('@FindTutorStore:token', token);
  } catch (error) {
    // Error saving data
    ToastAndroid.showWithGravity('Failed to store data.', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
}


/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  login: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the login for a state
export const request = (state) =>
  state.merge({ fetching: true, login: {} });

// successful login lookup
export const success = (state, action) => {
  const { login } = action;
  storeToken(login.token);
  return state.merge({ fetching: false, error: null, login });
}

// failed to get the login
export const failure = (state) => {
  ToastAndroid.showWithGravity('Invalid username/password.', ToastAndroid.SHORT, ToastAndroid.CENTER);
  return state.merge({ fetching: false, error: true, login: {} })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
});



