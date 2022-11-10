import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './task-slice';
import thunk from 'redux-thunk';
import calendarSlice from './calendar-slice';

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
