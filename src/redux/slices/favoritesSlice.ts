import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types';

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    clearFavorites(state) {
      state.favoriteIds = [];
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
