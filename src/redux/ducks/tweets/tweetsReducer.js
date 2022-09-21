import produce from "immer"

const initialState = {
   items: [],
   addFormState: '',
   loadingState: ''
}

export const tweetsReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_TWEETS':
         draft.items = payload
         draft.loadingState = 'LOADED'
         break
      case 'ADD_TWEET':
         draft.items.splice(0, 0, payload)
         draft.addFormState = 'LOADED'
         break
      case 'FETCH_ADD_TWEET':
         draft.addFormState = 'LOADING'
         break
      case 'ADD_FORM_STATE':
         draft.addFormState = payload
         break
      case 'SET_TWEETS_LOADING_STATE':
         draft.loadingState = payload
         break
      default:
         break
         
   }
}, initialState)