import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  items: [],
  loading: false,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const wishlistDoc = await getDoc(doc(db, 'wishlists', userId));
      if (wishlistDoc.exists()) {
        return wishlistDoc.data().items || [];
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveWishlist = createAsyncThunk(
  'wishlist/save',
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, 'wishlists', userId), { items });
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    moveToCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, moveToCart } = wishlistSlice.actions;
export default wishlistSlice.reducer;
