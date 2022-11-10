import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';
import TaskModal from '../UI/TaskModal';
import TaskItem from './TaskItem';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask } from '../../store/task-actions';

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState([]);

  const { tasks } = useSelector((state) => state.task);
  const { date } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const userId = auth.currentUser.uid;

  const changeCompleted = (id) => {
    dispatch(updateTask({ userId, id, date, role: 'update' }));
  };

  const deleteTask = (id) => {
    dispatch(updateTask({ userId, id, date, role: 'delete' }));
  };

  // 왜 if / else로 하면 안될까??
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
