import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postTutorDetailRequest: [],
  postTutorDetailSuccess: ['postTutorDetail'],
  postTutorDetailFailure: null
})

export const PostTutorDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  postTutorDetail: [],
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

// request the postTutorDetail for a state
export const request = (state) =>
  state.merge({ fetching: true, postTutorDetail: {} })

// successful postTutorDetail lookup
export const success = (state, action) => {
  const { postTutorDetail } = action
  return state.merge({ fetching: false, error: null, postTutorDetail })
}

// failed to get the postTutorDetail
export const failure = (state) =>
  state.merge({ fetching: false, error: true, postTutorDetail: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_TUTOR_DETAIL_REQUEST]: request,
  [Types.POST_TUTOR_DETAIL_SUCCESS]: success,
  [Types.POST_TUTOR_DETAIL_FAILURE]: failure
})
