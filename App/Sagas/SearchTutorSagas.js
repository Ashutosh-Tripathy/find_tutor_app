import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import SearchTutorActions from '../Redux/SearchTutorRedux'

export function* searchTutor(api, action) {
  // make the call to the api
  const { subjectId, stateId, districtId } = action;
  const response = yield call(api.searchTutor, subjectId, stateId, districtId)

  if (response.ok) {
    const tutors = path(['data'], response);
    // do data conversion here if needed
    yield put(SearchTutorActions.searchTutorSuccess(tutors))
  } else {
    yield put(SearchTutorActions.searchTutorFailure())
  }
}
