import {takeEvery, call, put} from 'redux-saga/effects'
import { fetchTweetsApi, addTweetApi } from '../../../api/tweetsApi';
import { signInApi, signUpApi, getMeApi, uploadAvatarApi, followApi } from '../../../api/authApi';
import {setUserLoginLoadingState, setUserRegisterLoadingState, setUserLoadingState, setUser} from './actionCreators'

export function* fetchSignInRequest (payload) {
   try {
      yield put(setUserLoadingState('LOADING'))
      const data = yield call(signInApi, payload)
      yield put(setUser(data.data))
      localStorage.setItem('token', data.data.token)
      yield put(setUserLoadingState('LOADED'))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   } 
}

export function* fetchSignUpRequest (payload) {
   try {
      yield put(setUserLoadingState('LOADING'))
      const data = yield call(signUpApi, payload)
      yield put(setUser(data.data))
      console.log(data);
      
      localStorage.setItem('token', data.token)
      yield put(setUserLoadingState('LOADED'))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   } 
}

export function* getUserRequest () {
   try {
      yield put(setUserLoadingState('LOADING'))
      const {data} = yield call(getMeApi)
      yield put(setUser(data))
      yield put(setUserLoadingState('LOADED'))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   } 
}

export function* uploadAvatarRequest (payload) {
   try {
      yield put(setUserLoadingState('LOADING'))
      const {data} = yield call(uploadAvatarApi, payload.payload)
      yield put(setUser(data))
      yield put(setUserLoadingState('LOADED'))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   }
}

export function* followRequest (payload) {
   try {
      // yield put(setUserLoadingState('LOADING'))
      const {data} = yield call(followApi, payload.payload)
      yield put(setUser(data))
      yield put(setUserLoadingState('LOADED'))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   }
}


export function* userSaga() {
   yield takeEvery('FETCH_SIGN_IN', fetchSignInRequest)
   yield takeEvery('FETCH_SIGN_UP', fetchSignUpRequest)
   yield takeEvery('GET_USER', getUserRequest)
   yield takeEvery('FETCH_UPLOAD_AVATAR', uploadAvatarRequest)
   yield takeEvery('FETCH_FOLLOW', followRequest)
}