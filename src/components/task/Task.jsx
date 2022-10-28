import React from 'react';
import styled from 'styled-components';
import CreateBtn from '../UI/CreateBtn';

const Task = (props) => {
  return (
    <TaskArea>
      <CreateBtn onShow={props.show} />
      <div>
        <ul>
          <li>일정을 추가하세요.</li>
          <li>일정을 추가하세요.</li>
          <li>일정을 추가하세요.</li>
        </ul>
      </div>
    </TaskArea>
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
