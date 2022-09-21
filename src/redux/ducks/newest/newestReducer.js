import produce from "immer"

const initialState = {
   users: [],
   userLoadingState: ''
}

export const newestReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_NEWEST':
         draft.users = payload
         break
      default:
         break
         
   }
}, initialState)