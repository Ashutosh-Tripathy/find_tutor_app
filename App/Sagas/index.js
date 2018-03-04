import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { SubjectsTypes } from '../Redux/SubjectsRedux'
import { StatesTypes } from '../Redux/StatesRedux'
import { DistrictsTypes } from '../Redux/DistrictsRedux'
import { SearchTutorTypes } from '../Redux/SearchTutorRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getSubjects } from './SubjectsSagas'
import { getStates } from './StatesSagas'
import { getDistricts } from './DistrictsSagas'
import { searchTutor } from './SearchTutorSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(SubjectsTypes.SUBJECTS_REQUEST, getSubjects, api),
    takeLatest(StatesTypes.STATES_REQUEST, getStates, api),
    takeLatest(DistrictsTypes.DISTRICTS_REQUEST, getDistricts, api),
    takeLatest(SearchTutorTypes.SEARCH_TUTOR_REQUEST, searchTutor, api)
  ])
}
