import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: [],
  signupSuccess: ['signup'],
  signupFailure: null
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  signup: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the signup for a state
export const request = (state) =>
  state.merge({ fetching: true, signup: {} })

// successful signup lookup
export const success = (state, action) => {
  const { signup } = action
  return state.merge({ fetching: false, error: null, signup })
}

// failed to get the signup
export const failure = (state) =>
  state.merge({ fetching: false, error: true, signup: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure
})
