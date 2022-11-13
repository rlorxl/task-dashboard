import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';
import TaskModal from '../UI/TaskModal';
import TaskItem from './TaskItem';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { handleAsyncActions } from '../../store/modules/task-actions';

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState([]);

  const { tasks } = useSelector((state) => state.task);
  const { date, year, month } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const userId = auth.currentUser.uid;

  const changeCompleted = (id) => {
    dispatch(
      handleAsyncActions('UPDATE', { userId, id, date, role: 'update' })
    );
  };

  const deleteTask = (id) => {
    dispatch(
      handleAsyncActions('UPDATE', { userId, id, date, role: 'delete' })
    );
  };

  useEffect(() => {
    setTaskData([]);

    tasks.map(
      ([id, contents]) => id === date && setTaskData(Object.entries(contents))
    );
  }, [tasks, date]);

  const show = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  let contents;
  if (taskData.length > 0) {
    contents = taskData.map(([key, value]) => (
      <TaskItem
        key={key}
        id={key}
        contents={value}
        onChangeCompleted={changeCompleted}
        onDeleteTask={deleteTask}
      />
    ));
  }

  if (taskData.length < 1) {
    contents = <p>새로운 일정을 추가하세요.</p>;
  }

  return (
    <>
      {showModal && <TaskModal onClose={close} />}
      <TaskArea>
        <div>
          <Date>
            {year}/{month + 1}/{date.slice(6)}
          </Date>
          <CreateBtn onShow={show} />
        </div>
        <ul>{contents}</ul>
      </TaskArea>
    </>
  );
};

const TaskArea = styled.section`
  width: 35%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.color.gray};
  display: flow-root;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3em;
  }

  ul {
    width: 100%;
    height: 420px;
    padding-left: 3em;
    margin-top: 2.5em;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Date = styled.span`
  font-size: 1.2em;
  color: ${({ theme }) => theme.color.carrot};
`;

export default Task;
