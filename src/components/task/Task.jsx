import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';
import TaskModal from '../UI/TaskModal';
import TaskItem from './TaskItem';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getDateTasks, updateTask } from '../../store/task-actions';

const month = new Date().getMonth() + 1;
const date = new Date().getDate();
const initialMonth = month < 10 ? '0' + month : month;
const initialDate = date < 10 ? '0' + date : date;

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  // taskData가 따로 있어야 함.

  const { tasks, date, notification } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const userId = auth.currentUser.uid;

  const changeCompleted = (id) => {
    dispatch(updateTask({ userId, id, date, role: 'update' }));
  };

  const deleteTask = (id) => {
    dispatch(updateTask({ userId, id, date, role: 'delete' }));
  };

  useEffect(() => {
    const formatedDate = `${new Date().getFullYear()}${initialMonth}${initialDate}`;
    dispatch(getDateTasks({ userId, formatedDate }));
  }, []);

  const show = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  let contents;
  if (tasks.length > 0) {
    contents = tasks.map(([key, value]) => (
      <TaskItem
        key={key}
        id={key}
        contents={value}
        onChangeCompleted={changeCompleted}
        onDeleteTask={deleteTask}
      />
    ));
  }

  if (tasks.length < 1) {
    contents = <p>새로운 일정을 추가하세요.</p>;
  }

  return (
    <>
      {showModal && <TaskModal onClose={close} />}
      <TaskArea>
        <CreateBtn onShow={show} />
        <div>
          <ul>{contents}</ul>
        </div>
      </TaskArea>
    </>
  );
};

const TaskArea = styled.section`
  width: 35%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.color.gray};
  display: flow-root;

  ul {
    width: 100%;
    height: 450px;
    padding-left: 4em;
    margin-top: 6em;
    overflow: scroll;
  }
`;

export default Task;
