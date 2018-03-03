import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import SubjectsActions from '../Redux/SubjectsRedux'

export function * getSubjects (api) {
  // make the call to the api
  const response = yield call(api.getSubjects)

  if (response.ok) {
    const subjects = path(['data'], response);
    // do data conversion here if needed
    yield put(SubjectsActions.subjectsSuccess(subjects))
  } else {
    yield put(SubjectsActions.subjectsFailure())
  }
}
