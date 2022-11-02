import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';
import CreateCategory from '../modal/CreateCategory';
import CreateMemo from '../modal/CreateMemo';
import { Button } from '../../styled/style';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { taskActions } from '../../store/task-slice';
import usePost from '../../hooks/usePost';
// import { useCallback, useEffect, useState } from 'react';

const backdropRoot = document.querySelector('#backdrop-root');
const modalRoot = document.querySelector('#modal-root');

const TaskModal = (props) => {
  const dispatch = useDispatch();

  const { date: selectedDate, categories } = useSelector((state) => state.task);

  const closeModal = () => {
    dispatch(taskActions.clear());
    props.onClose();
  };

  const { taskUpload, newDateTask, newMonthTask } = usePost();

  const db = getDatabase();
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const postRef = ref(db, `planit/${userId}`);
  const userRef = ref(db, `planit/${userId}/user`);
  const month = selectedDate.slice(0, 4) + '-' + selectedDate.slice(4, 6);

  const createTaskKey = (data) => {
    let taskKey, dateKey;
    Object.keys(data.tasks).find((key) => {
      if (key.split('-').join('') === selectedDate.slice(0, 6)) {
        taskKey = key;
      }
    });

    if (taskKey) {
      Object.keys(data.tasks[taskKey]).find((key) => {
        if (key === selectedDate) dateKey = key;
      });
    }

    return { taskKey, dateKey };
  };

  const createDateKey = (data, taskKey) => {
    let dateKey;
    Object.keys(data.tasks[taskKey]).find((key) => {
      if (key === selectedDate) dateKey = key;
    });
    return dateKey;
  };

  //prettier-ignore
  const createTask = () => {
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        newMonthTask({ userId, month });
      } else {
        const { taskKey, dateKey } = createTaskKey(data);

        if (dateKey) {
          taskUpload({ userId, taskKey, dateKey });
        } else if (taskKey) {
          newDateTask({ userId, taskKey });
        } else {
          newMonthTask({ userId, month });
        }
      }

      set(userRef, { categories: categories });
      closeModal();
    },
    { onlyOnce: true }
  )};

  const ModalChildren = (
    <>
      <h2>New Task</h2>
      <CreateCategory />
      <CreateMemo />
      <BtnArea>
        <CloseBtn onClick={closeModal}>Cancel</CloseBtn>
        <CreateBtn onClick={createTask}>Create</CreateBtn>
      </BtnArea>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, backdropRoot)}
      {ReactDOM.createPortal(<Modal>{ModalChildren}</Modal>, modalRoot)}
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
