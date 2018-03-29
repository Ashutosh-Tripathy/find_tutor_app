import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function* login(api, action) {
  // make the call to the api
  let { email, password } = action.login_data;
  const response = yield call(api.login, email, password)

  if (response.ok) {
    const tutor = path(['data'], response);
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(tutor))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
