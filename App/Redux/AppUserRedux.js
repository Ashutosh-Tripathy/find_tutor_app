import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appUserRequest: [],
  appUserSuccess: ['appUser'],
  appUserFailure: null
})

export const AppUserTypes = Types

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  appUser: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the appUser for a state
export const request = (state) =>
  state.merge({ fetching: true, appUser: [] })

// successful appUser lookup
export const success = (state, action) => {
  const { appUser } = action
  return state.merge({ fetching: false, error: null, appUser })
}

// failed to get the appUser
export const failure = (state) =>
  state.merge({ fetching: false, error: true, appUser: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_USER_REQUEST]: request,
  [Types.APP_USER_SUCCESS]: success,
  [Types.APP_USER_FAILURE]: failure
})
