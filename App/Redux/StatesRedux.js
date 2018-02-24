import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  statesRequest: [],
  statesSuccess: ['states'],
  statesFailure: null
})

export const StatesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  states: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the states for a state
export const request = (state) =>
  state.merge({ fetching: true, states: [] })

// successful states lookup
export const success = (state, action) => {
  const { states } = action
  return state.merge({ fetching: false, error: null, states })
}

// failed to get the states
export const failure = (state) =>
  state.merge({ fetching: false, error: true, states: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STATES_REQUEST]: request,
  [Types.STATES_SUCCESS]: success,
  [Types.STATES_FAILURE]: failure
})
