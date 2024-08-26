import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSearchValue = (state) => state.filter.searchValue;


export const { setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
