import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isCartOpen: false,
  searchQuery: '',
  notifications: [],
  theme: 'light',
  currency: 'INR',
  language: 'en',
  recentlyViewed: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    addRecentlyViewed: (state, action) => {
      const product = action.payload;
      state.recentlyViewed = [
        product,
        ...state.recentlyViewed.filter((p) => p.id !== product.id),
      ].slice(0, 10);
    },
  },
});

export const {
  toggleSidebar,
  toggleCart,
  setSearchQuery,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
  setCurrency,
  setLanguage,
  addRecentlyViewed,
} = uiSlice.actions;

export default uiSlice.reducer;
