import {takeEvery, call, put} from 'redux-saga/effects'
import { fetchTweetsApi, addTweetApi } from '../../../api/tweetsApi';
import { setTweetsLoadingState, setTweets, addTweet, setAddFormState } from './actionCreators';

export function* fetchTweetsRequest () {
   try {
      yield put(setTweetsLoadingState('LOADING'))
      const pathname = window.location.pathname
      const userId = pathname.includes('/user') ? pathname.split('/').pop() : null
      const items = yield call(fetchTweetsApi, userId)
      yield put(setTweets(items))
      yield put(setTweetsLoadingState('LOADED'))
   } catch (error) {
      yield put(setTweetsLoadingState('ERROR'))
   } 
}

export function* addTweetRequest (payload) {
   try {
      const item = yield call(addTweetApi, payload.payload)
      yield put(addTweet(item))
   } catch (error) {
      yield put(setAddFormState('ERROR'))
   } 
}

export function* tweetsSaga() {
   yield takeEvery('FETCH_ADD_TWEET', addTweetRequest);
   yield takeEvery('FETCH_TWEETS', fetchTweetsRequest);
}