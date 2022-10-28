import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';
import LogoutBtn from '../UI/LogoutBtn';

const Intro = () => {
  return (
    <MonthArea>
      <Title>오늘의 기록</Title>
      <DescArea>
        <p>이달의 목표</p>
        <span>
          <BiPencil />
        </span>
      </DescArea>
      <LogoutBtn />
    </MonthArea>
  );
};

const MonthArea = styled.section`
  width: 25%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.color.gray};
  position: relative;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 0.5em 0;
`;

const DescArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.1em;

  svg {
    font-size: 1em;
    margin-top: 6px;
  }
`;

export default Intro;
