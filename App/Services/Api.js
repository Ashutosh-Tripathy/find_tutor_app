// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://52.172.34.19:8080/api/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })

  const getSubjects = () => api.get('subjects')
  const getStates = () => api.get('states')

  const getDistricts = (stateId) => {
    let resp = api.get('districts/' + (stateId || 5));
    return resp;
  }

  const searchTutor = (subjectId, stateId, districtId) => {
    let resp = api.get('searchtutor?subject_id=' + (subjectId || 0) + '&state_id=' + (stateId || 0) + '&district_id=' + (districtId || 0));
    return resp;
  }

  const tutorDetail = (tutorId) => api.get('getTutorDetail/' + tutorId)
  const login = (tutorId) => api.post('authenticate/' + tutorId)
  const signup = ({ email, password, name, mobile, type }) => {
    return api.post('app_user?email=' + email + '&password=' + password + '&name=' + name + '&mobile=' + mobile + '&type=' + type)
  }
  const postTutorDetail = (tutorId) => api.post('tutor/' + tutorId)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getSubjects,
    getStates,
    getDistricts,
    searchTutor,
    tutorDetail,
    login,
    signup,
    postTutorDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}
