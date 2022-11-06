import { getDatabase, ref, set, update } from 'firebase/database';

const sendRequest = async (requestConfig) => {
  const db = getDatabase();
  const { method, sendRef, memos, category } = requestConfig;
  const postRef = ref(db, sendRef);

  const tasks = {};
  memos.map(({ id, content }) => {
    const postData = {
      category: category,
      memo: content,
      completed: false,
    };
    tasks[id] = postData;
  });

  method === 'set' ? await set(postRef, tasks) : await update(postRef, tasks);
};

export const newMonthTask = (payload) => {
  const { userId, task, memos } = payload;
  const month = task.date.slice(0, 4) + '-' + task.date.slice(4, 6);

  sendRequest({
    method: 'set',
    sendRef: `planit/${userId}/tasks/${month}/${task.date}`,
    memos: memos,
    category: task.selectedCategory,
  });
  console.log('새로운 월별 데이터를 만드는 중...🗓');
};

export const taskUpload = (payload) => {
  const { requestData, taskKey, dateKey } = payload;
  const { userId, task, memos } = requestData;

  sendRequest({
    method: 'update',
    sendRef: `planit/${userId}/tasks/${taskKey}/${dateKey}`,
    memos: memos,
    category: task.selectedCategory,
  });
  console.log('입력 날짜 데이터에 업로드 중...📂');
};

export const newDateTask = (payload) => {
  const { requestData, taskKey } = payload;
  const { userId, task, memos } = requestData;

  sendRequest({
    method: 'update',
    sendRef: `planit/${userId}/tasks/${taskKey}/${task.date}`,
    memos: memos,
    category: task.selectedCategory,
  });
  console.log('새로운 날짜 데이터에 업로드 중...📂');
};
