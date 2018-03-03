import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  subjectsRequest: [],
  subjectsSuccess: ['subjects'],
  subjectsFailure: null
})

export const SubjectsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  subjects: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the subjects for a state
export const request = (state) =>
  state.merge({ fetching: true, subjects: [] })

// successful subjects lookup
export const success = (state, action) => {
  const { subjects } = action
  return state.merge({ fetching: false, error: null, subjects })
}

// failed to get the subjects
export const failure = (state) =>
  state.merge({ fetching: false, error: true, subjects: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBJECTS_REQUEST]: request,
  [Types.SUBJECTS_SUCCESS]: success,
  [Types.SUBJECTS_FAILURE]: failure
})
