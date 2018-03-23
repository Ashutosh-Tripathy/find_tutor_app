import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function* login(api, action) {
  // make the call to the api
  const { tutorId }  = action;
  const response = yield call(api.login, tutorId)

  if (response.ok) {
    const tutor = path(['data'], response);
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(tutor))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
