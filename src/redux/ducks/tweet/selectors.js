export const selectTweet = state => state.tweet
export const selectTweetData = state => selectTweet(state).data
export const selectLoadingState = state => selectTweet(state).loadingState
export const selectIsTweetLoading = state => selectLoadingState(state) === 'LOADING'
export const selectIsTweetLoaded = state => selectLoadingState(state) === 'LOADED'