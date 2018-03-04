import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchTutorRequest: [],
  searchTutorSuccess: ['searchTutor'],
  searchTutorFailure: null
})

export const SearchTutorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tutors: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the searchTutor for a state
export const request = (state) =>
  state.merge({ fetching: true, tutors: [] })

// successful searchTutor lookup
export const success = (state, action) => {
  const { tutors } = action
  return state.merge({ fetching: false, error: null, tutors })
}

// failed to get the searchTutor
export const failure = (state) =>
  state.merge({ fetching: false, error: true, tutors: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_TUTOR_REQUEST]: request,
  [Types.SEARCH_TUTOR_SUCCESS]: success,
  [Types.SEARCH_TUTOR_FAILURE]: failure
})
