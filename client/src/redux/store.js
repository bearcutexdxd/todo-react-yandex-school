/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import tagsStateReducer from './slices/TagSelectorSlice';
import ticketsReducer from './slices/TicketsSlice';
import currentTicketReducer from './slices/CurrentTicketSlice';
import draggedTaskReducer from './slices/DraggedTaskSlice';
import validationReducer from './slices/ValidationSlice';

export const store = configureStore({
  reducer: {
    tagsState: tagsStateReducer,
    tickets: ticketsReducer,
    currentTicket: currentTicketReducer,
    draggedTask: draggedTaskReducer,
    validation: validationReducer,
  },
});
