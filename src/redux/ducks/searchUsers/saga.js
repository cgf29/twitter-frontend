import {takeEvery, call, put} from 'redux-saga/effects'
import { getSearchUsersByLettersApi } from '../../../api/authApi'
import { setSearchUsers } from './actionCreators'

export function* fetchSearchUsersRequest (payload) {
   try {
      const {data} = yield call(getSearchUsersByLettersApi, payload.payload)
      yield put(setSearchUsers(data))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   } 
}

export function* searchUsersSaga() {
   yield takeEvery('FETCH_SEARCH_USERS', fetchSearchUsersRequest)
}