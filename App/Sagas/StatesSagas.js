import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import StatesActions from '../Redux/StatesRedux'

export function * getStates (api) {
  // make the call to the api
  const response = yield call(api.getStates)

  if (response.ok) {
    const states = path(['data', 'states'], response);
    // do data conversion here if needed
    yield put(StateActions.statesSuccess(states))
  } else {
    yield put(StateActions.statesFailure())
  }
}
