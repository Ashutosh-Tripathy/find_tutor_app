import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  districtsRequest: ['stateId'],
  districtsSuccess: ['districts'],
  districtsFailure: null
})

export const DistrictsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  districts: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the districts for a state
export const request = (state ) =>
  state.merge({ fetching: true, districts: []})

// successful districts lookup
export const success = (state, action) => {
  const { districts } = action
  return state.merge({ fetching: false, error: null, districts })
}

// failed to get the districts
export const failure = (state) =>
  state.merge({ fetching: false, error: true, districts: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DISTRICTS_REQUEST]: request,
  [Types.DISTRICTS_SUCCESS]: success,
  [Types.DISTRICTS_FAILURE]: failure
})
