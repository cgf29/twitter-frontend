export const selectUser = state => state.user
export const selectUserData = state => selectUser(state).user
export const selectIsAuth = state => !!selectUser(state).user
export const selectUserLoadingState = state => selectUser(state).userLoadingState