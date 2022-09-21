import {takeEvery, call, put} from 'redux-saga/effects'
import { fetchTagsApi } from '../../../api/tagsApi';
import { setTags, setTagsLoadingState } from './actionCreators';

export function* fetchTagsRequest () {
   try {
      const items = yield call(fetchTagsApi)
      yield put(setTags(items))
   } catch (error) {
      // yield put(setTagsLoadingState('ERROR'))
   }
   
}

export function* tagsSaga() {
   yield takeEvery('FETCH_TAGS', fetchTagsRequest);
}