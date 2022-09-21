import {takeEvery, call, put} from 'redux-saga/effects'
import { fetchTweetDataApi, deleteTweetApi, updateTweetApi, likeTweetApi, unlikeTweetApi, commentTweetApi } from '../../../api/tweetsApi';
import { setTweet, setTweetLoadingState, updateTweet, likeTweet, unlikeTweet, commentTweet } from './actionCreators';

export function* fetchTweetRequest ({payload}) {
   try {
      const data = yield call(fetchTweetDataApi, payload)
      yield put(setTweet(data.data))
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* deleteTweetRequest ({payload}) {
   try {
      yield call(deleteTweetApi, payload)
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* updateTweetRequest ({payload}) {
   try {
      const data = yield call(updateTweetApi, payload)
      yield put(updateTweet(data))
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* likeTweetRequest ({payload}) {
   try {
      const data = yield call(likeTweetApi, payload)
      yield put(likeTweet(data))
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* unlikeTweetRequest ({payload}) {
   try {
      const data = yield call(unlikeTweetApi, payload)
      yield put(unlikeTweet(data))
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* commentTweetRequest ({payload}) {
   try {
      const data = yield call(commentTweetApi, payload)
      yield put(commentTweet(data))
   } catch (error) {
      yield put(setTweetLoadingState('ERROR'))
   }
}

export function* tweetSaga() {
   yield takeEvery('FETCH_TWEET_DATA', fetchTweetRequest);
   yield takeEvery('DELETE_TWEET', deleteTweetRequest);
   yield takeEvery('FETCH_UPDATE_TWEET', updateTweetRequest);
   yield takeEvery('FETCH_LIKE_TWEET', likeTweetRequest);
   yield takeEvery('FETCH_UNLIKE_TWEET', unlikeTweetRequest);
   yield takeEvery('FETCH_COMMENT_TWEET', commentTweetRequest);
}