import { createSlice } from '@reduxjs/toolkit';

const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth();
const THIS_DATE = new Date().getDate();

export const formattedMonth = (month = THIS_MONTH) => {
  const _month = month + 1;
  return _month < 10 ? '0' + _month : _month;
};

export const formattedDate = (date = THIS_DATE) => {
  return date < 10 ? '0' + date : date;
};

const initialStateValue = {
  date: `${THIS_YEAR}${formattedMonth()}${formattedDate()}`,
  year: THIS_YEAR,
  month: THIS_MONTH,
  day: new Date(THIS_YEAR, THIS_MONTH, 1).getDay(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialStateValue,
  reducers: {
    setDate: (state, action) => {
      const _month = state.month + 1;
      const formattedMonth = _month < 10 ? '0' + _month : _month;
      state.date = `${state.year}${formattedMonth}${action.payload}`;
    },
    increaseMonth: (state) => {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
      state.day = new Date(state.year, state.month, 1).getDay();
    },
    decreaseMonth: (state) => {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
      state.day = new Date(state.year, state.month, 1).getDay();
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice;
