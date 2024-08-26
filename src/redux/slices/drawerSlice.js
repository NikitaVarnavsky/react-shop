import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api/endPoints';

export const fetchDrawerItems = createAsyncThunk('drawer/fetchDrawerItems', async () => {
  const userId = localStorage.getItem('id');

  const { data } = await axios.get(`${BASE_URL}/drawer?user=${userId}`);

  return data[0].items;

  // if (drawerResponse.data[0]) {
  //   dispatch(setDrawerItems(drawerResponse.data[0].items));
  // }
});

const initialState = {
  drawerItems: [],
};
export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawerItems(state, action) {
      state.drawerItems = action.payload;
    },
    addItem(state, action) {
      state.drawerItems.push(action.payload);
    },
    removeItem(state, action) {
      state.drawerItems = state.drawerItems.filter((obj) => obj.uniqueId !== action.payload);
    },
    removeAllItems(state, action) {
      state.drawerItems = [];
    },

    increment(state, action) {
      const findItem = state.drawerItems.find((obj) => obj.uniqueId === action.payload);
      findItem.count -= 1;
    },

    decrement(state, action) {
      const findItem = state.drawerItems.find((obj) => obj.uniqueId === action.payload);
      findItem.count += 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDrawerItems.pending, (state) => {
      state.drawerItems = [];
    });
    builder.addCase(fetchDrawerItems.fulfilled, (state, action) => {
      state.drawerItems = action.payload;
    });
    builder.addCase(fetchDrawerItems.rejected, (state) => {
      state.drawerItems = [];
    });
  },
});

export const selectDrawerItems = (state) => state.drawer.drawerItems;

// Action creators are generated for each case reducer function
export const { setDrawerItems, addItem, increment, decrement, removeItem, removeAllItems } =
  drawerSlice.actions;

export default drawerSlice.reducer;
