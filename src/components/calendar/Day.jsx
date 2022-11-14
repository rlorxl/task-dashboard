import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  calendarActions,
  formattedDate,
  formattedMonth,
} from '../../store/modules/calendar-slice';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

const Day = ({ year, month, date }) => {
  const [color, setColor] = useState('');
  const [active, setActive] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { tasks } = useSelector((state) => state.task);
  const { date: selectedDate } = useSelector((state) => state.calendar);

  const _month = formattedMonth(month);
  const _date = formattedDate(date);
  const todayDate = `${year}${_month}${_date}`;

  const dispatch = useDispatch();
  const dayRef = useRef();

  const setDateHandler = () => {
    dispatch(calendarActions.setDate(_date));

    setIsTouched(true);
  };

  useEffect(() => {
    setActive(false);

    if (_date.toString() === selectedDate.slice(6)) {
      setActive(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    setColor('');

    if (!tasks) return;

    let completedCount = 0;
    let ratio = 0;
    tasks.map(([id, contents]) => {
      if (id === todayDate) {
        const dateTasks = Object.values(contents);
        dateTasks.map((task) => task.completed === true && completedCount++);
        ratio = ~~((completedCount / dateTasks.length) * 100);

        switch (true) {
          case ratio === 100:
            setColor('full');
            break;
          case ratio >= 50 && ratio < 100:
            setColor('half');
            break;
          case ratio < 50:
            setColor('less');
            break;
        }
      }
    });
  }, [tasks]);

  const isToday =
    new Date().getFullYear() === year &&
    new Date().getMonth() === month &&
    new Date().getDate() === date;

  return (
    <Item
      today={isToday}
      onClick={setDateHandler}
      color={color}
      isActive={active && isTouched}
      ref={dayRef}
    >
      {date >= 0 && date}
    </Item>
  );
};

const Item = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 0.5em;
  font-size: 1.2em;
  color: ${({ theme }) => theme.color.carrot};
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  cursor: pointer;

  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    border-radius: 35%;
  }

  ${(props) =>
    props.today &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 13%;
        width: 5px;
        height: 5px;
        background: ${({ theme }) => theme.color.carrot};
        border-radius: 50%;
      }
    `}

  ${(props) =>
    props.isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
    `}

    ${(props) =>
    props.color === 'full' &&
    props.today &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
      color: #fff;

      &::after {
        content: '';
        position: absolute;
        bottom: 13%;
        width: 5px;
        height: 5px;
        background: #fff;
        border-radius: 50%;
      }
    `}


  ${(props) =>
    props.color === 'full' &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
      color: #fff;
    `}

    ${(props) =>
    props.color === 'half' &&
    css`
      background: ${({ theme }) => theme.color.carrot50};
      border-radius: 35%;
      color: #fff;
    `}

    ${(props) =>
    props.color === 'less' &&
    css`
      background: ${({ theme }) => theme.color.carrot25};
      border-radius: 35%;
      color: ${({ theme }) => theme.color.carrot};
    `}
`;

export default Day;
