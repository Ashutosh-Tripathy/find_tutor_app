import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppUserActions from '../Redux/AppUserRedux'

export function * getAppUser (api, action) {
  const { token, userId } = action;
  // make the call to the api
  const response = yield call(api.getAppUser, token, userId)

  if (response.ok) {
    const appUser = path(['data'], response);
    // do data conversion here if needed
    yield put(AppUserActions.appUserSuccess(appUser))
  } else {
    yield put(AppUserActions.appUserFailure())
  }
}
