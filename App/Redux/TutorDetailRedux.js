import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tutorDetailRequest: [],
  tutorDetailSuccess: ['tutorDetail'],
  tutorDetailFailure: null
})

export const TutorDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tutorDetail: [],
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the tutorDetail for a state
export const request = (state) =>
  state.merge({ fetching: true, tutorDetail: {} })

// successful tutorDetail lookup
export const success = (state, action) => {
  const { tutorDetail } = action
  return state.merge({ fetching: false, error: null, tutorDetail })
}

// failed to get the tutorDetail
export const failure = (state) =>
  state.merge({ fetching: false, error: true, tutorDetail: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TUTOR_DETAIL_REQUEST]: request,
  [Types.TUTOR_DETAIL_SUCCESS]: success,
  [Types.TUTOR_DETAIL_FAILURE]: failure
})
