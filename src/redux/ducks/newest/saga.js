import {takeEvery, call, put} from 'redux-saga/effects'
import { getUsersApi } from '../../../api/authApi'
import { setNewest } from './actionCreators'

export function* fetchNewestRequest () {
   try {
      const {data} = yield call(getUsersApi)
      yield put(setNewest(data))
   } catch (error) {
      yield put(setUserLoadingState('ERROR'))
   } 
}

export function* newestSaga() {
   yield takeEvery('FETCH_NEWEST', fetchNewestRequest)
}