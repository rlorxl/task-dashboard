import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './task-slice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
