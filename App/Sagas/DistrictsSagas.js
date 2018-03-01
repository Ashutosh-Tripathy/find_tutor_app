import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DistrictsActions from '../Redux/DistrictsRedux'

export function * getDistricts (api, action) {
  const { stateId } = action;
  // make the call to the api
  const response = yield call(api.getDistricts, stateId)

  if (response.ok) {
    const districts = path(['data'], response);
    // do data conversion here if needed
    yield put(DistrictsActions.districtsSuccess(districts))
  } else {
    yield put(DistrictsActions.districtsFailure())
  }
}
