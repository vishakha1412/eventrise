import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedItems: [],
  savedItems: [],
};

const userInteractionsSlice = createSlice({
  name: 'userInteractions',
  initialState,
  reducers: {
    setLikedItems: (state, action) => {
      state.likedItems = action.payload;
    },
    setSavedItems: (state, action) => {
      state.savedItems = action.payload;
    },
    toggleLike: (state, action) => {
      const itemId = action.payload;
      if (state.likedItems.includes(itemId)) {
        state.likedItems = state.likedItems.filter(id => id !== itemId);
      } else {
        state.likedItems.push(itemId);
      }
    },
  },
});
export const { setLikedItems, setSavedItems, toggleLike } = userInteractionsSlice.actions;
export default userInteractionsSlice.reducer;

