import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MonthBtn from '../UI/MonthBtn';
import Day from './Day';
import { auth } from '../../firebase';
import { handleAsyncActions } from '../../store/modules/task-actions';
import {
  calendarActions,
  formattedMonth,
} from '../../store/modules/calendar-slice';

const monthName = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {
  const [date, setDate] = useState([]);
  const [startDay, setStartDay] = useState([]);

  const { year, month, day } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();
  const userId = auth.currentUser.uid;

  const increaseMonthHandler = () => {
    dispatch(calendarActions.increaseMonth());
    dispatch(calendarActions.setDate('01'));
  };

  const decreaseMonthHandler = () => {
    dispatch(calendarActions.decreaseMonth());
    dispatch(calendarActions.setDate('01'));
  };

  useEffect(() => {
    const taskKey = `${year}-${formattedMonth(month)}`;
    dispatch(handleAsyncActions('GET', { userId, taskKey, role: 'all' }));
    dispatch(handleAsyncActions('CATEGORY', { userId }));
  }, [date]);

  useEffect(() => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const newDateArr = new Array(lastDate).fill('');
    const lastDays = new Array(day).fill('');

    setDate(newDateArr);
    setStartDay(lastDays);
  }, [month]);

  return (
    <CalendarArea>
      <Month>
        <h2>{monthName[month]}</h2>
        <MonthBtn
          onIncrease={increaseMonthHandler}
          onDecrease={decreaseMonthHandler}
        />
      </Month>
      <Flexbox gap='1.4em'>
        {week.map((item, i) => (
          <Week key={i}>{item}</Week>
        ))}
      </Flexbox>
      <Flexbox gap='2%'>
        {startDay.map((_, i) => (
          <Space key={i} />
        ))}
        {date.map((_, i) => (
          <Day key={i} date={i + 1} year={year} month={month} />
        ))}
      </Flexbox>
    </CalendarArea>
  );
};

const CalendarArea = styled.section`
  margin: 0 auto;
  flex-basis: 400px;
  margin: 0 1em;
`;

const Month = styled.div`
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2em;
    margin: 0.5em 0 1em 0;
  }
`;

const Week = styled.div`
  font-size: 1em;
  font-weight: 400;
  padding: 0 0.8em;
  color: ${({ theme }) => theme.color.gray};
  margin-bottom: 0.6em;
`;

const Space = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
`;

const Flexbox = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${(props) => props.gap};
  margin-bottom: 1em;
`;

export default Calendar;
