/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draggedTask: {},
};

const draggedTaskSlice = createSlice({
  name: 'draggedTask',
  initialState,
  reducers: {
    setDragged(state, action) {
      state.draggedTask = action.payload;
    },
  },
});

export const { setDragged } = draggedTaskSlice.actions;
export default draggedTaskSlice.reducer;
