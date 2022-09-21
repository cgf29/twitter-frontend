import produce from "immer"

const initialState = {
   users: [],
   userLoadingState: ''
}

export const searchUsersReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_SEARCH_USERS':
         draft.users = payload
         break
      default:
         break
         
   }
}, initialState)