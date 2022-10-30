import styled from 'styled-components';
import { Button } from '../../styled/style';
import { BiPlus } from 'react-icons/bi';
import MemoItem from './MemoItem';
import { useState } from 'react';

const CreateMemo = () => {
  const [memoItem, setMemoItem] = useState([]);

  const createRandomId = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  const addMemoHandler = () => {
    setMemoItem((prev) => [...prev, { id: createRandomId() }]);
  };

  const removeMemo = (uniqId) => {
    const newItems = memoItem.filter((item) => item.id !== uniqId);
    setMemoItem(newItems);
  };

  return (
    <MemoArea>
      <TitleArea>
        <h3>Memo</h3>
        <Button onClick={addMemoHandler}>
          <BiPlus />
        </Button>
      </TitleArea>
      <ul>
        {memoItem.map((item) => (
          <MemoItem key={item.id} id={item.id} onRemoveItem={removeMemo} />
        ))}
      </ul>
    </MemoArea>
  );
};

const MemoArea = styled.div`
  ul {
    height: 150px;
    overflow-y: scroll;
  }
`;

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
