import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';
import TaskModal from '../UI/TaskModal';
import TaskItem from './TaskItem';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { getDateTasks } from '../../store/task-actions';

const month = new Date().getMonth() + 1;
const date = new Date().getDate();
const initialMonth = month < 10 ? '0' + month : month;
const initialDate = date < 10 ? '0' + date : date;

const Task = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const userId = auth.currentUser.uid;

  const formatedDate = `${new Date().getFullYear()}${initialMonth}${initialDate}`;

  useEffect(() => {
    dispatch(getDateTasks({ userId, formatedDate }));
  }, [dispatch]);

  const show = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <TaskModal onClose={close} />}
      <TaskArea>
        <CreateBtn onShow={show} />
        <div>
          <ul>
            <TaskItem />
          </ul>
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

  li {
    width: 100%;
    height: 110px;
    background-color: #fff;
    border-radius: 1em;
    padding: 1.4em;
    color: ${({ theme }) => theme.color.black};
    font-size: 1em;
    margin-bottom: 0.6em;
  }
`;

export default Task;
