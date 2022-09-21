import produce from "immer"

const initialState = {
   data: undefined,
   loadingState: ''
}

export const tweetReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_TWEET_DATA':
         draft.data = payload
         draft.loadingState = 'LOADED'
         break
      case 'FETCH_TWEET_DATA':
         draft.data = undefined
         draft.loadingState = 'LOADING'
         break
      case 'DELETE_TWEET':
         draft.data = undefined
         break
      case 'UPDATE_TWEET':
         draft.data = payload
         break
      case 'LIKE_TWEET':
         draft.data = payload
         break
      case 'UNLIKE_TWEET':
         draft.data = payload
         break
      case 'COMMENT_TWEET':
         console.log(payload)
         draft.data = payload
         break
      case 'SET_LOADING_STATE':
         draft.loadingState = payload
         break
      default:
         break
         
   }
}, initialState)