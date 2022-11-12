import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './modules/task-slice';
import calendarSlice from './modules/calendar-slice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
