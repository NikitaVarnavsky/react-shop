import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorized: false,
  userId: 0,
  token: '',
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorized(state, action) {
      state.authorized = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const selectAuthorized = (state) => state.authorization.authorized;
export const selectUserId = (state) => state.authorization.userId;
export const selectToken = (state) => state.authorization.token;

export const { setAuthorized, setUserId, setToken } = authorizationSlice.actions;

export default authorizationSlice.reducer;
