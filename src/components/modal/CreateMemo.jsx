import styled from 'styled-components';
import { Button } from '../../styled/style';
import { BiPlus } from 'react-icons/bi';
import MemoItem from './MemoItem';

const CreateMemo = () => {
  return (
    <div>
      <TitleArea>
        <h3>Memo</h3>
        <Button>
          <BiPlus />
        </Button>
      </TitleArea>
      <ul>
        <MemoItem />
      </ul>
    </div>
  );
};

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.color.black};
    font-weight: normal;
    margin-top: 1.2em;
  }

  button {
    width: 35px;
    height: 35px;
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    border-radius: 8px;
    background: #fff;

    svg {
      font-size: 1.5em;
      color: ${({ theme }) => theme.color.carrot};
    }

    &:hover {
      background: #fff;
    }
  }
`;

export default CreateMemo;
