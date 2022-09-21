export const fetchSignIn = (payload) => ({
   type: 'FETCH_SIGN_IN',
   payload
})

export const fetchSignUp = (payload) => ({
   type: 'FETCH_SIGN_UP',
   payload
})

export const getUser = (payload) => ({
   type: 'GET_USER',
   payload
})

export const setUser = (payload) => ({
   type: 'SET_USER',
   payload
})

export const signOut = (payload) => ({
   type: 'SIGN_OUT',
   payload
})

export const setUserLoadingState = (payload) => ({
   type: 'SET_LOADING_STATE',
   payload
})

export const setUserLoginLoadingState = (payload) => ({
   type: 'SET_LOGIN_LOADING_STATE',
   payload
})

export const setUserRegisterLoadingState = (payload) => ({
   type: 'SET_REGISTER_LOADING_STATE',
   payload
})

export const fetchUploadAvatar = (payload) => ({
   type: 'FETCH_UPLOAD_AVATAR',
   payload
})

export const fetchFollow = (payload) => ({
   type: 'FETCH_FOLLOW',
   payload
})