import { createSlice } from '@reduxjs/toolkit'

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState: { isLoading: false, status: null },
  reducers: {
    updateAppStatus: (state, action) => {
      return {
        isLoading: action.payload.isLoading,
        status: action.payload.status
      }
    }
  },
}); 

export const selectAppStatus = (state) => {
  return state.appStatus;
}

export const { updateAppStatus } = appStatusSlice.actions;
export default appStatusSlice.reducer;