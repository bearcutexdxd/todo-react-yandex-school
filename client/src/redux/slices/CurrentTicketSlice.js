/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currentTicket: {},
};

export const fetchCurrentTicket = createAsyncThunk('currentTicket/fetchCurrentTicket', async (id) => {
  const response = await fetch(`http://localhost:3030/${id}`, {
    credentials: 'include',
  });

  const data = await response.json();
  return data;
});

const currentTicketSlice = createSlice({
  name: 'currentTicket',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentTicket.fulfilled, (state, action) => {
      state.currentTicket = action.payload;
    });
  },
});

export default currentTicketSlice.reducer;
