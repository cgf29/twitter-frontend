import { tweetsSaga } from './ducks/tweets/saga'
import { all } from 'redux-saga/effects'
import { tagsSaga } from './ducks/tags/saga'
import { tweetSaga } from './ducks/tweet/saga'
import { userSaga } from './ducks/user/saga'
import { newestSaga } from './ducks/newest/saga'
import { searchUsersSaga } from './ducks/searchUsers/saga'

export default function* rootSaga() {
   yield all([tweetsSaga(), tagsSaga(), tweetSaga(), userSaga(), newestSaga(), searchUsersSaga()])
}
