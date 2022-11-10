import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { calendarActions } from '../../store/calendar-slice';

const Day = ({ year, month, date, space }) => {
  const dispatch = useDispatch();

  const setDateHandler = () => {
    const newDate = date < 10 ? '0' + date : date;
    dispatch(calendarActions.setDate(newDate));
  };

  const isToday =
    new Date().getFullYear() === year &&
    new Date().getMonth() === month &&
    new Date().getDate() === date;

  return (
    <Item today={isToday} space={space} onClick={setDateHandler}>
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
`;

export default Day;
