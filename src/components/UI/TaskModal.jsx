import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';
import CreateCategory from '../modal/CreateCategory';
import CreateMemo from '../modal/CreateMemo';
import { Button } from '../../styled/style';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { taskActions } from '../../store/task-slice';
import usePost from '../../hooks/usePost';

const backdropRoot = document.querySelector('#backdrop-root');
const modalRoot = document.querySelector('#modal-root');

const TaskModal = (props) => {
  const dispatch = useDispatch();

  const {
    date: selectedDate,
    selectedCategory,
    categories,
    memos,
  } = useSelector((state) => state.task);

  const closeModal = () => {
    dispatch(taskActions.clear());
    props.onClose();
  };

  const { sendRequest } = usePost();

  const createTask = () => {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const month = selectedDate.slice(0, 4) + '-' + selectedDate.slice(4, 6);
    const postRef = ref(db, `planit/${userId}`);
    const userRef = `planit/${userId}/user`;

    onValue(
      postRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        if (data) {
          let taskKey, dateKey;
          Object.keys(data.tasks).find((key) => {
            if (key.split('-').join('') === selectedDate.slice(0, 6)) {
              taskKey = key;
            }
          });

          // 입력한 날짜의 월 데이터 O
          if (taskKey) {
            console.log(taskKey);

            Object.keys(data.tasks[taskKey]).find((key) => {
              if (key === selectedDate) {
                dateKey = key;
              }
            });

            if (dateKey) {
              console.log(dateKey);
              // 입력날짜 데이터 O
              console.log('입력 날짜 데이터에 업로드 중...📂');

              // const taskRef = ref(
              //   db,
              //   `planit/${userId}/tasks/${taskKey}/${dateKey}`
              // );

              // const tasks = {};
              // for (const [key, value] of Object.entries(memos)) {
              //   const postData = {
              //     category: selectedCategory,
              //     memo: value,
              //     completed: false,
              //   };
              //   tasks[key] = postData;
              // }

              // update(taskRef, tasks);
              // set(userRef, { categories: categories });

              sendRequest({
                method: 'update',
                sendRef: `planit/${userId}/tasks/${taskKey}/${dateKey}`,
                userRef: userRef,
              });
            } else {
              // 입력날짜 데이터 X
              console.log('새로운 날짜 데이터에 업로드 중...📂');

              const newTaskRef = ref(
                db,
                `planit/${userId}/tasks/${taskKey}/${selectedDate}`
              );

              const tasks = {};
              for (const [key, value] of Object.entries(memos)) {
                const postData = {
                  category: selectedCategory,
                  memo: value,
                  completed: false,
                };
                tasks[key] = postData;
              }

              update(newTaskRef, tasks);
              set(userRef, { categories: categories });
            }
          } else {
            // 입력한 날짜의 월 데이터 X
            console.log('새로운 월별 데이터를 만드는 중...🗓');

            const taskRef = ref(
              db,
              `planit/${userId}/tasks/${month}/${selectedDate}`
            );

            const tasks = {};
            for (const [key, value] of Object.entries(memos)) {
              const postData = {
                category: selectedCategory,
                memo: value,
                completed: false,
              };
              tasks[key] = postData;
            }
            set(taskRef, tasks);
            set(userRef, { categories: categories });
          }
        } else {
          // first
          console.log('first setting...🖋');

          // const taskRef = ref(
          //   db,
          //   `planit/${userId}/tasks/${month}/${selectedDate}`
          // );

          // const tasks = {};
          // for (const [key, value] of Object.entries(memos)) {
          //   const postData = {
          //     category: selectedCategory,
          //     memo: value,
          //     completed: false,
          //   };
          //   tasks[key] = postData;
          // }
          // set(taskRef, tasks);
          // set(userRef, { categories: categories });

          sendRequest({
            method: 'set',
            sendRef: `planit/${userId}/tasks/${month}/${selectedDate}`,
            userRef: userRef,
          });
        }

        closeModal();
      },
      { onlyOnce: true }
    );
  };

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
