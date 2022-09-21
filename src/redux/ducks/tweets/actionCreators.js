export const setTweets = (payload) => ({
   type: 'SET_TWEETS',
   payload
})

export const fetchTweets = () => ({
   type: 'FETCH_TWEETS'
})

export const setTweetsLoadingState = (payload) => ({
   type: 'SET_TWEETS_LOADING_STATE',
   payload
})

export const fetchAddTweet = (payload) => ({
   type: 'FETCH_ADD_TWEET',
   payload
})

export const addTweet = (payload) => ({
   type: 'ADD_TWEET',
   payload
})

export const setAddFormState = (payload) => ({
   type: 'ADD_FORM_STATE',
   payload
})