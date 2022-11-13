import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from 'firebase/database';
import { taskActions } from '../store/modules/task-slice';
import * as posts from '../lib/posts';

// * createKey ------------------------------------------------------------------------------------------------------------------------ //
const createTaskKey = (data, date) => {
  let taskKey, dateKey;
  Object.keys(data).find((key) => {
    if (key.split('-').join('') === date.slice(0, 6)) {
      taskKey = key;
    }
  });

  if (taskKey) {
    Object.keys(data[taskKey]).find((key) => {
      if (key === date) dateKey = key;
    });
  }

  return { taskKey, dateKey };
};

const db = getDatabase();

export const sendTaskData = (requestData) => {
  const postRef = ref(db, `planit/${requestData.userId}`);
  const userRef = ref(db, `planit/${requestData.userId}/user/category`);

  // prettier-ignore
  onValue(postRef, async (snapshot) => {
      const data = await snapshot.val();
      if (!data) {
        posts.newMonthTask(requestData);
      } else {
        const { taskKey, dateKey } = createTaskKey(
          data.tasks,
          requestData.date
        );
        if (dateKey) {
          posts.taskUpload({ requestData, taskKey, dateKey });
        } else if (taskKey) {
          posts.newDateTask({ requestData, taskKey });
        } else {
          posts.newMonthTask(requestData);
        }
      }

      set(userRef, requestData.task.categories);
    },
    { onlyOnce: true }
  );
};

export const getTasks = (requestData) => {
  const { dispatch, payload } = requestData;
  const { userId, taskKey, role } = payload;

  if (role === 'all') {
    // console.log(payload);
    const taskRef = ref(db, `planit/${userId}/tasks/${taskKey}`);
    onValue(taskRef, async (snapshot) => {
      const data = await snapshot.val();
      dispatch(taskActions.setTasks(data));
    });
  } else {
    const goalRef = ref(db, `planit/${userId}/user/goal`);
    onValue(goalRef, async (snapshot) => {
      const data = await snapshot.val();

      if (data) dispatch(taskActions.setGoal(data));
    });
  }
};

export const getCategories = (requestData) => {
  const { payload, dispatch } = requestData;
  const { userId } = payload;
  const categoryRef = ref(db, `planit/${userId}/user/category`);
  onValue(categoryRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      dispatch(taskActions.setCategories(data));
    }
  });
};

export const updateTask = (requestData) => {
  const { userId, id, date, role } = requestData;
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

export const editGoal = (requestData) => {
  const goalRef = ref(db, `planit/${requestData.userId}/user/goal`);
  set(goalRef, { text: requestData.goal });
};
