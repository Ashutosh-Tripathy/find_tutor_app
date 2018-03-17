import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TutorDetailActions from '../Redux/TutorDetailRedux'

export function* tutorDetail(api, action) {
  // make the call to the api
  const { tutorId }  = action;
  const response = yield call(api.tutorDetail, tutorId)

  if (response.ok) {
    const tutor = path(['data'], response);
    // do data conversion here if needed
    yield put(TutorDetailActions.tutorDetailSuccess(tutor))
  } else {
    yield put(TutorDetailActions.tutorDetailFailure())
  }
}
