import { getDatabase, ref, set, update } from 'firebase/database';
import { useSelector } from 'react-redux';

const usePost = () => {
  const db = getDatabase();
  const {
    date: selectedDate,
    selectedCategory,
    categories,
    memos,
  } = useSelector((state) => state.task);

  const sendRequest = async (requestConfig) => {
    console.log(requestConfig);
    const { method, sendRef } = requestConfig;
    const postRef = ref(db, sendRef);

    const tasks = {};
    for (const [key, value] of Object.entries(memos)) {
      const postData = {
        category: selectedCategory,
        memo: value,
        completed: false,
      };
      tasks[key] = postData;
    }

    method === 'set' ? await set(postRef, tasks) : await update(postRef, tasks);
  };

  const newMonthTask = (payload) => {
    const { userId, month } = payload;
    sendRequest({
      method: 'set',
      sendRef: `planit/${userId}/tasks/${month}/${selectedDate}`,
    });
    console.log('새로운 월별 데이터를 만드는 중...🗓');
  };

  const taskUpload = (payload) => {
    const { userId, taskKey, dateKey } = payload;
    sendRequest({
      method: 'update',
      sendRef: `planit/${userId}/tasks/${taskKey}/${dateKey}`,
    });
    console.log('입력 날짜 데이터에 업로드 중...📂');
  };

  const newDateTask = (payload) => {
    const { userId, taskKey } = payload;
    sendRequest({
      method: 'update',
      sendRef: `planit/${userId}/tasks/${taskKey}/${selectedDate}`,
    });
    console.log('새로운 날짜 데이터에 업로드 중...📂');
  };

  return { taskUpload, newDateTask, newMonthTask };
};

export default usePost;
