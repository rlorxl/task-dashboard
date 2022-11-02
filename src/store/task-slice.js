import { createSlice } from '@reduxjs/toolkit';

const month = new Date().getMonth() + 1;
const date = new Date().getDate();

const initialMonth = month < 10 ? '0' + month : month;
const initialDate = date < 10 ? '0' + date : date;

const initialStateValue = {
  date: `${new Date().getFullYear()}${initialMonth}${initialDate}`,
  categories: [],
  selectedCategory: '',
  memos: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialStateValue,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    addCategory: (state, action) => {
      const isExisted = state.categories.includes(action.payload);
      if (isExisted) return;
      else state.categories.push(action.payload);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setMemo: (state, action) => {
      const { id, value } = action.payload;
      state.memos[id] = value;
    },
    removeMemo: (state, action) => {
      const removeId = Object.keys(state.memos).find(
        (key) => key === action.payload
      );
      delete state.memos[removeId];
    },
    clear: (state) => {
      state.selectedCategory = '';
      state.memos = {};
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
