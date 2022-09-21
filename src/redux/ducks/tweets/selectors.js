export const selectTweets = state => state.tweets
export const selectTweetsItems = state => selectTweets(state).items
export const selectLoadingState = state => selectTweets(state).loadingState
export const selectAddFormState = state => selectTweets(state).addFormState
export const selectIsTweetsLoading = state => selectLoadingState(state) == 'LOADING'
export const selectIsTweetsLoaded = state => selectLoadingState(state) == 'LOADED'