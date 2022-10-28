import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  date: '',
  memos: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState: { value: initialStateValue },
  reducers: {
    setDate: (state, action) => {
      state.value.date = action.payload;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
