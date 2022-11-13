import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';
import CreateCategory from '../modal/CreateCategory';
import CreateMemo from '../modal/CreateMemo';
import { Button } from '../../styled/style';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { taskActions } from '../../store/modules/task-slice';
import { handleAsyncActions } from '../../store/modules/task-actions';
import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useEffect } from 'react';

const createRandomId = () => {
  return Math.random().toString(36).substring(2, 12);
};

const TaskModal = (props) => {
  const [memos, setMemos] = useState([{ id: createRandomId(), content: '' }]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const task = useSelector((state) => state.task);
  const { date } = useSelector((state) => state.calendar);
  const { selectedCategory } = useSelector((state) => state.task);

  useEffect(() => {
    let isContentExisted = memos.find((memo) => memo.content !== '');
    if (selectedCategory !== '' || isContentExisted) {
      setErrorMessage('');
      setError(false);
    }
  }, [memos, selectedCategory]);

  const userId = auth.currentUser.uid;

  const closeModal = () => {
    dispatch(taskActions.clear());
    props.onClose();
  };

  const createTask = () => {
    let isContentExisted = memos.find((memo) => memo.content !== '');
    console.log(isContentExisted);
    if (selectedCategory === '') {
      setError((prev) => !prev);
      setErrorMessage('카테고리를 선택해 주세요.');
      return;
    } else if (!isContentExisted) {
      setError((prev) => !prev);
      setErrorMessage('입력된 메모가 없습니다.');
      return;
    }

    const filteredMemos = memos.filter((memo) => memo.content !== '');
    dispatch(handleAsyncActions('SEND', { userId, date, task, filteredMemos }));
    closeModal();
  };

  const ModalChildren = (
    <>
      <h2>New Task</h2>
      <CreateCategory />
      <CreateMemo memos={memos} setMemos={setMemos} setError={setError} />
      {error && errorMessage !== '' && (
        <ErrorMessage>
          <BiErrorCircle />
          {errorMessage}
        </ErrorMessage>
      )}
      <BtnArea>
        <CloseBtn onClick={closeModal}>Cancel</CloseBtn>
        <CreateBtn onClick={createTask}>Create</CreateBtn>
      </BtnArea>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.querySelector('#backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Modal>{ModalChildren}</Modal>,
        document.querySelector('#modal-root')
      )}
    </>
  );
};

const BtnArea = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;

  button {
    width: 120px;
    height: 55px;
    font-size: 1.1em;
  }
`;

const CloseBtn = styled(Button)`
  margin-right: 15px;
  border: 1.5px solid ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.gray};

  &:hover {
    background-color: rgba(101, 101, 101, 0.25);
    color: ${({ theme }) => theme.color.gray};
  }
`;

const CreateBtn = styled(Button)`
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  color: ${({ theme }) => theme.color.carrot};

  &:hover {
    background-color: ${({ theme }) => theme.color.carrot};
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 25px;
  left: 40%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.error};
  svg {
    font-size: 1.3em;
    margin-right: 3px;
    transform: translateY(-2px);
  }
`;

export default TaskModal;
