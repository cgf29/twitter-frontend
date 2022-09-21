import produce from "immer"

const initialState = {
   user: undefined,
   userLoadingState: '',
   authLoadingState: ''
}

export const userReducer = produce((draft, action) => {
   const {type, payload} = action

   switch (type) {
      case 'SET_USER':
         draft.user = payload
         draft.authLoadingState = 'LOADED'
         break
      case 'SIGN_OUT':
         draft.user = undefined
         localStorage.removeItem('token')
         break
      case 'SET_LOADING_STATE':
         draft.userLoadingState = payload
         break
      default:
         break
         
   }
}, initialState)