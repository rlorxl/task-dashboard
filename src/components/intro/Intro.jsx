import styled from 'styled-components';
import { BiEdit, BiCheckSquare, BiUndo } from 'react-icons/bi';
import LogoutBtn from '../UI/LogoutBtn';
import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../store/auth-context';
import { auth } from '../../firebase';
import { handleAsyncActions } from '../../store/modules/task-actions';

const Intro = () => {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const authCtx = useContext(AuthContext);
  const userId = auth.currentUser.uid;

  const { goal } = useSelector((state) => state.task);

  const logoutHandler = () => {
    console.log('logout');
    authCtx.logout();
    navigate('/login');
  };

  const editGoalHandler = () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      inputRef.current.value.trim() !== '' &&
        dispatch(
          handleAsyncActions('EDIT', { userId, goal: inputRef.current.value })
        );
    }
  };

  const cancelEditHandler = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    dispatch(handleAsyncActions('GET', { userId }));
  }, []);

  return (
    <MonthArea>
      <Title>오늘의 기록</Title>
      <DescArea>
        {!isEditing && goal !== '' && <p>{goal}</p>}
        {!isEditing && goal === '' && <p>이달의 목표</p>}
        {isEditing && <EditGoal name='goal' ref={inputRef} />}
        <span>
          {!isEditing && <BiEdit onClick={editGoalHandler} />}
          {isEditing && (
            <div>
              <BiCheckSquare onClick={editGoalHandler} />
              <BiUndo onClick={cancelEditHandler} />
            </div>
          )}
        </span>
      </DescArea>
      <LogoutBtn onLogout={logoutHandler} />
    </MonthArea>
  );
};

const MonthArea = styled.section`
  width: 25%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.color.gray};
  position: relative;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 0.5em 0;
`;

const DescArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.1em;

  svg {
    font-size: 1.2em;
    margin-top: 6px;
    cursor: pointer;
  }

  span div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const EditGoal = styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  border: none;
  text-indent: 5px;
  font-size: 1em;
`;

export default Intro;
