import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  subjects: require('./SubjectsRedux').reducer,
  states: require('./StatesRedux').reducer,
  districts: require('./DistrictsRedux').reducer,
  appUser: require('./AppUserRedux').reducer,
  searchTutor: require('./SearchTutorRedux').reducer,
  tutorDetail: require('./TutorDetailRedux').reducer,
  search: require('./SearchRedux').reducer,
  login: require('./LoginRedux').reducer,
  signup: require('./SignupRedux').reducer,
  postTutorDetail: require('./PostTutorDetailRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
