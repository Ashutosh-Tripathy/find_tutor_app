import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import SignupActions from '../Redux/SignupRedux'

export function* signup(api, action) {
  // make the call to the api
  const { tutorId }  = action;
  const response = yield call(api.signup, tutorId)

  if (response.ok) {
    const tutor = path(['data'], response);
    // do data conversion here if needed
    yield put(SignupActions.signupSuccess(tutor))
  } else {
    yield put(SignupActions.signupFailure())
  }
}
