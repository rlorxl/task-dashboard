import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';
import TaskModal from '../UI/TaskModal';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    try {
      const db = getDatabase();
      const userId = auth.currentUser.uid;
      const postRef = ref(db, `planit/${userId}`);

      onValue(postRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setTaskData(data);
          console.log(data);
        }
      });
    } catch (err) {
      console.log(err.message || '일정을 불러올 수 없습니다.');
    }
  }, []);

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
            <li>일정을 추가하세요.</li>
            <li>일정을 추가하세요.</li>
            <li>일정을 추가하세요.</li>
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
