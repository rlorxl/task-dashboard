import React, { useState } from 'react';
import styled from 'styled-components';
import MonthBtn from '../UI/MonthBtn';
import Day from './Day';

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
const newDate = new Date();
const startYear = newDate.getFullYear();

const initialDate = {
  startMonth: newDate.getMonth(),
  startDate: new Date(startYear, newDate.getMonth(), 0).getDate(),
  startDay: new Date(startYear, newDate.getMonth(), 1).getDay(),
};

const Calendar = () => {
  const [year, setYear] = useState(startYear);
  const [month, setMonth] = useState(initialDate.startMonth);
  const [date, setDate] = useState(initialDate.startDate);
  const [day, setDay] = useState(initialDate.startDay);

  const today = year === startYear && month === initialDate.startMonth;

  const setDateHandler = {
    increaseMonth() {
      if (month >= 11) setMonth(0);
      else setMonth(month + 1);
    },
    decreaseMonth() {
      if (month <= 0) setMonth(11);
      else setMonth(month - 1);
    },
    setPrevYear() {
      if (month <= 0) setYear(year - 1);
    },
    setNextYear() {
      if (month >= 11) setYear(year + 1);
    },
    setDate() {
      const lastDate = new Date(year, month, 0).getDate();
      setDate(lastDate);
    },
    setNextDay() {
      const startDay = new Date(year, month + 1, 1).getDay();
      setDay(startDay);
    },
    setPrevDay() {
      const startDay = new Date(year, month - 1, 1).getDay();
      setDay(startDay);
    },
  };

  const test = Array(day).fill(0);
  const dateNumber = Array(date).fill(0);

  return (
    <CalendarArea>
      <Month>
        <h2>{monthName[month]}</h2>
        <MonthBtn {...setDateHandler} />
      </Month>
      <Flexbox gap='1.4em'>
        {week.map((item, i) => (
          <Week key={i}>{item}</Week>
        ))}
      </Flexbox>
      <Flexbox gap='2%'>
        {test.map((_, i) => (
          <Day key={i} space={'space'} />
        ))}
        {dateNumber.map((_, i) => (
          <Day key={i} year={year} month={month} date={i} today={today} />
        ))}
      </Flexbox>
    </CalendarArea>
  );
};

const CalendarArea = styled.section`
  margin: 0 auto;
  flex-basis: 400px;
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

  /* &.today {
        color: $carrot;
    } */
`;

const Flexbox = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${(props) => props.gap};
  margin-bottom: 1em;
`;

export default React.memo(Calendar);
