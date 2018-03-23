import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PostTutorDetailActions from '../Redux/PostTutorDetailRedux'

export function* postTutorDetail(api, action) {
  // make the call to the api
  const { tutorId }  = action;
  const response = yield call(api.postTutorDetail, tutorId)

  if (response.ok) {
    const tutor = path(['data'], response);
    // do data conversion here if needed
    yield put(PostTutorDetailActions.postTutorDetailSuccess(tutor))
  } else {
    yield put(PostTutorDetailActions.postTutorDetailFailure())
  }
}
