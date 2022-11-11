import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from 'firebase/database';
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
              requestData.date
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
          status: 'SEND_TASKS_FAILED',
          message: error.message,
        })
      );
    }
  };
};

export const getTasks = (requestData) => {
  const { userId, taskKey } = requestData;

  return async (dispatch) => {
    const getAllData = async () => {
      const taskRef = ref(db, `planit/${userId}/tasks/${taskKey}`);
      onValue(taskRef, async (snapshot) => {
        const data = await snapshot.val();
        dispatch(taskActions.setTasks(data));
      });
    };

    // const getDateData =

    try {
      getAllData();
      dispatch(
        taskActions.setNotification({
          status: 'GET_TASKS_SUCCESS',
          message: null,
        })
      );
    } catch (error) {
      dispatch(
        taskActions.setNotification({
          status: 'GET_TASKS_FAILED',
          message: error.message,
        })
      );
    }
  };
};

export const updateTask = (requestData) => {
  const { userId, id, date, role } = requestData;

  return async (dispatch) => {
    const updateData = () => {
      const taskKey = date.slice(0, 4) + '-' + date.slice(4, 6);
      const taskRef = ref(db, `planit/${userId}/tasks/${taskKey}/${date}`);

      onValue(
        taskRef,
        async (snapshot) => {
          const data = await snapshot.val();
          if (!data) {
            throw new Error('데이터를 불러올 수 없습니다!');
          }

          if (role === 'update') {
            const updates = {};
            // prettier-ignore
            for (const key in data) {
              key === id 
                ? (updates[key] = { ...data[key], completed: !data[key].completed })
                : (updates[key] = data[key]);
            }

            update(taskRef, updates);
          }

          if (role === 'delete') {
            const removeRef = ref(
              db,
              `planit/${userId}/tasks/${taskKey}/${date}/${id}`
            );
            remove(removeRef);
          }
        },
        { onlyOnce: true }
      );
    };

    try {
      updateData();
      dispatch(
        taskActions.setNotification({
          status: 'UPDATE_TASKS_SUCCESS',
          message: null,
        })
      );
    } catch (error) {
      dispatch(
        taskActions.setNotification({
          status: 'UPDATE_TASKS_FAILED',
          message: error.message,
        })
      );
    }
  };
};

export default sendTaskData;
