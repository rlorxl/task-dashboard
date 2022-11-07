import styled from 'styled-components';
import { Button } from '../../styled/style';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const MonthBtn = ({ onIncrease, onDecrease }) => {
  const increaseMonthHandler = () => {
    onIncrease();
  };

  const decreaseMonthHandler = () => {
    onDecrease();
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
