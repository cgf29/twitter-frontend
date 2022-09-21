import { combineReducers } from "redux"
import { tweetsReducer } from "./ducks/tweets/tweetsReducer"
import { tagsReducer } from './ducks/tags/tagsReducer'
import { tweetReducer } from "./ducks/tweet/tweetReducer"
import { userReducer } from "./ducks/user/userReducer"
import { newestReducer } from "./ducks/newest/newestReducer"
import { searchUsersReducer } from "./ducks/searchUsers/searchUsersReducer"

export const rootReducer = combineReducers({
   tweets: tweetsReducer,
   tweet: tweetReducer,
   tags: tagsReducer,
   user: userReducer,
   newest: newestReducer,
   searchUsers: searchUsersReducer
})