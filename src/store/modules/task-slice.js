import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  selectedCategory: '',
  categories: [],
  tasks: [],
  goal: '',
  notification: { status: '', messgae: '' },
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialStateValue,
  reducers: {
    addCategory: (state, action) => {
      const isExisted = state.categories.includes(action.payload);
      if (isExisted) return;
      else state.categories.push(action.payload);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTasks: (state, action) => {
      const newTasks = [];
      if (!action.payload) state.tasks = [];

      for (const key in action.payload) {
        newTasks.push([key, action.payload[key]]);
      }
      state.tasks = newTasks;
    },
    setGoal: (state, action) => {
      state.goal = action.payload.text;
    },
    setNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        messgae: action.payload.message,
      };
    },
    clear: (state) => {
      state.selectedCategory = '';
      state.memos = {};
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
