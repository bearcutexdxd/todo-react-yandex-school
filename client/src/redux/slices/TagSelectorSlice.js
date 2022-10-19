/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  violet: false,
  green: false,
  red: false,
  orange: false,
  blue: false,
  light_green: false,
  dark_blue: false,
  yellow: false,
};

const tagsState = createSlice({
  name: 'tagsState',
  initialState,
  reducers: {
    toggle(state, action) {
      state[action.payload] = !state[action.payload];
    },
    reset(state) {
      Object.keys(state).forEach((el) => {
        state[el] = false;
      });
    },
    set(state, action) {
      Object.keys(state).forEach((el) => {
        state[el] = false;
      });
      action.payload.forEach((el) => {
        state[el] = true;
      });
    },
  },
});

export const { toggle, reset, set } = tagsState.actions;
export default tagsState.reducer;
