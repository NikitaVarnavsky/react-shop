import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../api/endPoints';


export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  // const favoritesResponse = await axios.get(
  //   `https://a83efa66f4148eb5.mokky.dev/favorites?user=${userId}`,
  // );
  // if (favoritesResponse.data[0]) {
  //   dispatch(setFavoritesList(favoritesResponse.data[0].items));
  // }
  const userId = localStorage.getItem('id');

  const { data } = await axios.get(`${BASE_URL}/favorites?user=${userId}`);
  return data[0].items;
});

const initialState = {
  favoritesList: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesList(state, action) {
      state.favoritesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.favoritesList = [];
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoritesList = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.favoritesList = [];
    });
  },
});

export const selectFavoritesItems = (state) => state.favorites.favoritesList;

export const { setFavoritesList } = favoritesSlice.actions;

export default favoritesSlice.reducer;
