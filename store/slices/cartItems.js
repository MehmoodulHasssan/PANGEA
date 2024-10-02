import notify from '@/helpers/notify';
import { setRecentItems } from '@/helpers/setRecentItems';
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  added: 0,
};
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      const { product, quantity, availableStock } = action.payload;
      const itemExists = state.items.some(
        (item) => item.product.id === product.id
      );
      if (itemExists) {
        toast.error('Item already in cart');
        return;
      }
      state.items.push(action.payload);
      state.added += 1;
      notify({ product, quantity, adding: true, removing: false });
      setRecentItems(action.payload.product);
    },
    removeItem(state, action) {
      const { product, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        notify({ product, quantity, adding: false, removing: true });
      }
    },
    increment(state, action) {
      const { product, availableStock, quantity } = action.payload;
      if (availableStock && quantity >= availableStock) {
        toast.error('No more stock available');
        return;
      }
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += 1;
      }
    },
    decrement(state, action) {
      const { product } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
          notify({ product, quantity, adding: false, removing: true });
        } else {
          state.items[itemIndex].quantity -= 1;
        }
      }
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
