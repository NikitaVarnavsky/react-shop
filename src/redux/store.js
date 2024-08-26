import { configureStore } from '@reduxjs/toolkit';

import cardSlice from './slices/cardSlice';
import favoritesSlice from './slices/favoritesSlice';
import filterSlice from './slices/filterSlice';
import drawerSlice from './slices/drawerSlice';
import authorizationSlice from './slices/authorizationSlice';
import modalWindowsSlice from './slices/modalWindowsSlice';

export const store = configureStore({
  reducer: {
    card: cardSlice,
    favorites: favoritesSlice,
    filter: filterSlice,
    drawer: drawerSlice,
    authorization: authorizationSlice,
    // signIn: signInSlice,
    modalWindows: modalWindowsSlice,
  },
});
