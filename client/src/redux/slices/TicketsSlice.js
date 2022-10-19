/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  fetchedTickets: [],
  filters: [false, false, false],
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await fetch('http://localhost:3030/', {
    credentials: 'include',
  });

  const data = await response.json();

  return data.tickets;
});

export const fetchDraggedTicket = createAsyncThunk('ticket/fetchDraggedTicket', async ({ id, status }) => {
  const response = await fetch(`http://localhost:3030/drag/${id}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
    credentials: 'include',
  });

  const data = await response.json();

  return data.tickets;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    toggleFilters(state, action) {
      switch (action.payload) {
        case 'comments':
          state.filters[0] = !state.filters[0];
          break;
        case 'description':
          state.filters[1] = !state.filters[1];
          break;
        case 'tag':
          state.filters[2] = !state.filters[2];
          break;
        default:
          break;
      }
    },
    filterTickets(state, action) {
      switch (action.payload.toString()) {
        case 'false,false,false':
          state.tickets = state.fetchedTickets;
          break;
        case 'true,false,false':
          state.tickets = state.fetchedTickets.filter((el) => el.comments.length > 0);
          break;
        case 'false,true,false':
          state.tickets = state.fetchedTickets.filter((el) => (el.description !== '' && el.description));
          break;
        case 'false,false,true':
          state.tickets = state.fetchedTickets.filter((el) => el.tagsArray.length > 0);
          break;
        case 'true,true,false':
          state.tickets = state.fetchedTickets.filter((el) => el.comments.length > 0 && (el.description !== '' && el.description));
          break;
        case 'false,true,true':
          state.tickets = state.fetchedTickets.filter((el) => el.tagsArray.length > 0 && (el.description !== '' && el.description));
          break;
        case 'true,false,true':
          state.tickets = state.fetchedTickets.filter((el) => el.tagsArray.length > 0 && el.comments.length > 0);
          break;
        case 'true,true,true':
          state.tickets = state.fetchedTickets.filter((el) => el.tagsArray.length > 0 && el.comments.length > 0 && (el.description !== '' && el.description));
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload;
      state.fetchedTickets = action.payload;
    });
    builder.addCase(fetchDraggedTicket.fulfilled, (state, action) => {
      state.tickets = action.payload;
      state.fetchedTickets = action.payload;
    });
  },
});

export const { toggleFilters, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
