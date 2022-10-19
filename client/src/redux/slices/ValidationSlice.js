/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emptyInput: false,
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    toggleError(state, action) {
      state.emptyInput = action.payload;
    },
  },
});

export const { toggleError } = validationSlice.actions;
export default validationSlice.reducer;
