export const selectTags = state => state.tags
export const selectTagsItems = state => selectTags(state).items
export const selectLoadingState = state => selectTags(state).loadingState
export const selectIsTagsLoading = state => selectLoadingState(state) == 'LOADING'
export const selectIsTagsLoaded = state => selectLoadingState(state) == 'LOADED'