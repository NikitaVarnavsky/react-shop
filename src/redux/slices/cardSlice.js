import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api/endPoints';

export const fetchItems = createAsyncThunk('card/fetchItems', async (params, thunkApi) => {
  const { data } = await axios.get(`${BASE_URL}/items`);
  return data;
});

const initialState = {
  items: [],
  currentItem: {},
  showCurrentItem: false,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    setShowCurrentItem(state, action) {
      state.showCurrentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
    });
  },
});

export const selectCardItems = (state) => state.card.items;
export const selectCurrentItem = (state) => state.card.currentItem;
export const selectShowCurrentItem = (state) => state.card.showCurrentItem;
// Можно получить только 1 объект и передать id в селектор
// export const selectCardItems = (id) =>(state) => state.items.find(obj => obj.id === id);

// Action creators are generated for each case reducer function
export const { setItems, setCurrentItem, setShowCurrentItem } = cardSlice.actions;

export default cardSlice.reducer;
