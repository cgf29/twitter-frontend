import produce from "immer"

const initialState = {
   items: [],
   loadingState: ''
}

export const tagsReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_TAGS':
         draft.items = payload
         draft.loadingState = 'LOADED'
         break
      case 'FETCH_TAGS':
         draft.loadingState = 'LOADING'
         break
      case 'SET_LOADING_STATE':
         draft.loadingState = payload
         break
      default:
         break
         
   }
}, initialState)