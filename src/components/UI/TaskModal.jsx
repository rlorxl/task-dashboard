import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';
import CreateCategory from '../modal/CreateCategory';
import CreateMemo from '../modal/CreateMemo';
import { Button } from '../../styled/style';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { taskActions } from '../../store/task-slice';
import sendTaskData from '../../store/task-actions';
import { useState } from 'react';

const TaskModal = (props) => {
  const createRandomId = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  const [memos, setMemos] = useState([{ id: createRandomId(), content: '' }]);

  const dispatch = useDispatch();

  const task = useSelector((state) => state.task);

  const userId = auth.currentUser.uid;

  const closeModal = () => {
    dispatch(taskActions.clear());
    props.onClose();
  };

  const createTask = () => {
    dispatch(sendTaskData({ userId, task, memos }));
    closeModal(); // 성공하면 closeModal 실패하면 에러메세지 alert
  };

  const ModalChildren = (
    <>
      <h2>New Task</h2>
      <CreateCategory />
      <CreateMemo memos={memos} setMemos={setMemos} />
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

export default TaskModal;
