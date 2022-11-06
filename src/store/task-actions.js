import { getDatabase, ref, onValue, set } from 'firebase/database';
import { createTaskKey } from '../lib/taskUtils';
import { newMonthTask, taskUpload, newDateTask } from '../lib/posts';
import { taskActions } from './task-slice';

const db = getDatabase();

const sendTaskData = (requestData) => {
  return async (dispatch) => {
    const fetchData = () => {
      const postRef = ref(db, `planit/${requestData.userId}`);
      const userRef = ref(db, `planit/${requestData.userId}/user`);
      onValue(
        postRef,
        async (snapshot) => {
          const data = await snapshot.val();
          if (!data) {
            newMonthTask(requestData);
          } else {
            const { taskKey, dateKey } = createTaskKey(
              data.tasks,
              requestData.task.date
            );
            if (dateKey) {
              taskUpload({ requestData, taskKey, dateKey });
            } else if (taskKey) {
              newDateTask({ requestData, taskKey });
            } else {
              newMonthTask(requestData);
            }
          }

          set(userRef, { categories: requestData.task.categories });
        },
        { onlyOnce: true }
      );
    };

    try {
      fetchData();
      dispatch(
        taskActions.setNotification({
          status: 'SEND_TASKS_SUCCESS',
          message: null,
        })
      );
    } catch (error) {
      dispatch(
        taskActions.setNotification({
          status: 'SEND_TASKS_ERROR',
          message: error.message,
        })
      );
    }
  };
};

export const getDateTasks = (requestData) => {
  const { userId, formatedDate: date } = requestData;

  return async (dispatch) => {
    dispatch(taskActions.setDate(date));

    const getData = () => {
      const month = date.slice(0, 4) + '-' + date.slice(4, 6);
      const taskRef = ref(db, `planit/${userId}/tasks/${month}/${date}`);
      onValue(taskRef, async (snapshot) => {
        const data = await snapshot.val();

        if (!data) {
          throw new Error('데이터를 불러올 수 없습니다!');
        }

        dispatch(taskActions.setTasks(data));
      });
    };

    try {
      getData();
      dispatch(
        taskActions.setNotification({
          status: 'GET_TASKS_SUCCESS',
          message: null,
        })
      );
    } catch (error) {
      dispatch(
        taskActions.setNotification({
          status: 'GET_TASKS_ERROR',
          message: error.message,
        })
      );
    }
  };
};

export default sendTaskData;
