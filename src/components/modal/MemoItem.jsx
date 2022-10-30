import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { taskActions } from '../../store/task-slice';

const MemoItem = ({ id, onRemoveItem }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const setMemo = ({ target }) => {
    const { name: id, value } = target;

    setText(value);
    dispatch(taskActions.setMemo({ id, value }));
  };

  const removeMemoHandler = () => {
    onRemoveItem(id);
    dispatch(taskActions.removeMemo(id));
  };

  return (
    <Memo>
      <textarea
        name={id}
        placeholder='일정을 입력하세요'
        value={text}
        onChange={setMemo}
        autoFocus
      ></textarea>
      <button onClick={removeMemoHandler}>x</button>
    </Memo>
  );
};

const Memo = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  textarea {
    font-size: 0.9rem;
    width: 100%;
    height: 3rem;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.color.black};
    font-size: 1rem;
    line-height: 1.2rem;
    padding: 1rem 0;
    resize: none;
    overflow: hidden;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.gray};
    opacity: 0.3;
  }

  &:last-child::after {
    opacity: 0;
  }
`;

export default MemoItem;
