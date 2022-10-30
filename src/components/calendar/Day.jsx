import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { taskActions } from '../../store/task-slice';

const Day = ({ year, month, date, today, space }) => {
  const dispatch = useDispatch();

  const setDateHandler = () => {
    if (date === undefined) return;
    const _month = month + 1;
    const _date = date + 1;
    const newMonth = _month < 10 ? '0' + _month : _month;
    const newDate = _date < 10 ? '0' + _date : _date;

    dispatch(taskActions.setDate(`${year}${newMonth}${newDate}`));
  };

  return (
    <Item
      isToday={today && date + 1 === new Date().getDate()}
      space={space}
      onClick={setDateHandler}
    >
      {date >= 0 && date + 1}
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
    props.isToday &&
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
`;

export default Day;
