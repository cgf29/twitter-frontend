export const setTweet = (payload) => ({
   type: 'SET_TWEET_DATA',
   payload
})

export const fetchTweet = (payload) => ({
   type: 'FETCH_TWEET_DATA',
   payload
})

export const deleteTweet = (payload) => ({
   type: 'DELETE_TWEET',
   payload
})

export const updateTweet = (payload) => ({
   type: 'UPDATE_TWEET',
   payload
})

export const likeTweet = (payload) => ({
   type: 'LIKE_TWEET',
   payload
})

export const unlikeTweet = (payload) => ({
   type: 'UNLIKE_TWEET',
   payload
})

export const fetchLikeTweet = (payload) => ({
   type: 'FETCH_LIKE_TWEET',
   payload
})

export const fetchUnlikeTweet = (payload) => ({
   type: 'FETCH_UNLIKE_TWEET',
   payload
})

export const fetchUpdateTweet = (payload) => ({
   type: 'FETCH_UPDATE_TWEET',
   payload
})

export const fetchCommentTweet = (payload) => ({
   type: 'FETCH_COMMENT_TWEET',
   payload
})

export const commentTweet = (payload) => ({
   type: 'COMMENT_TWEET',
   payload
})

export const setTweetLoadingState = (payload) => ({
   type: 'SET_LOADING_STATE',
   payload
})