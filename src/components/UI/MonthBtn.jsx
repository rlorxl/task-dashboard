import styled from 'styled-components';
import { Button } from '../../styled/style';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const MonthBtn = (props) => {
  const increaseMonthHandler = () => {
    props.increaseMonth();
    props.setNextYear();
    props.setDate();
    props.setNextDay();
  };

  const decreaseMonthHandler = () => {
    props.decreaseMonth();
    props.setPrevYear();
    props.setDate();
    props.setPrevDay();
  };

  return (
    <BtnArea>
      <Arrow onClick={decreaseMonthHandler}>
        <BiChevronLeft />
      </Arrow>
      <Arrow onClick={increaseMonthHandler}>
        <BiChevronRight />
      </Arrow>
    </BtnArea>
  );
};

const BtnArea = styled.div`
  width: 4em;
  display: flex;
  justify-content: space-between;

  svg {
    color: ${({ theme }) => theme.color.carrot};
  }
`;

const Arrow = styled(Button)`
  font-size: 1.4em;
`;

export default MonthBtn;
