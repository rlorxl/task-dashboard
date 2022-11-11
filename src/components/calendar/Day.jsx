import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  calendarActions,
  formattedDate,
  formattedMonth,
} from '../../store/calendar-slice';
import { useEffect } from 'react';
import { useState } from 'react';

const Day = ({ year, month, date, space }) => {
  const [color, setColor] = useState('');

  const { tasks } = useSelector((state) => state.task);

  const _month = formattedMonth(month);
  const _date = formattedDate(date);
  const todayDate = `${year}${_month}${_date}`;

  const dispatch = useDispatch();

  const setDateHandler = () => {
    dispatch(calendarActions.setDate(_date));
  };

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
    <Item today={isToday} space={space} onClick={setDateHandler} color={color}>
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
      border: 1.5px solid ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
    `}

  ${(props) =>
    props.space &&
    css`
      border: none;
      cursor: default;

      &:hover {
        border: none;
        cursor: default;
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
