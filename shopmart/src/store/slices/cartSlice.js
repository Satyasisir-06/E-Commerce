import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
};

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const cartDoc = await getDoc(doc(db, 'carts', userId));
      if (cartDoc.exists()) {
        return cartDoc.data();
      }
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveCart = createAsyncThunk(
  'cart/save',
  async ({ userId, cartData }, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, 'carts', userId), cartData);
      return cartData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          totalPrice: newItem.price * newItem.quantity,
        });
      }

      state.totalQuantity += newItem.quantity;
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    removeFromCart: (state, action) => {
      const { id, variant } = action.payload;
      const existingItem = state.items.find((item) => item.id === id && item.variant === variant);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => !(item.id === id && item.variant === variant));
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    updateQuantity: (state, action) => {
      const { id, variant, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id && item.variant === variant);

      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    moveToWishlist: (state, action) => {
      const { id, variant } = action.payload;
      const existingItem = state.items.find((item) => item.id === id && item.variant === variant);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => !(item.id === id && item.variant === variant));
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    loadCartFromStorage: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  moveToWishlist,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
