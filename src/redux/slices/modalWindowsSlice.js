import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModalExit: false,
};

export const modalWindowsSlice = createSlice({
  name: 'modalWindows',
  initialState,
  reducers: {
    setShowModalExit(state, action) {
      state.showModalExit = action.payload;
    },
  },
});

export const selectModalExit = (state) => state.modalWindows.showModalExit;

export const { setShowModalExit } = modalWindowsSlice.actions;

export default modalWindowsSlice.reducer;
