import { getDatabase, ref, set, update } from 'firebase/database';
// import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const usePost = () => {
  const {
    date: selectedCategory,
    categories,
    memos,
  } = useSelector((state) => state.task);

  const db = getDatabase();

  const sendRequest = async (requestConfig) => {
    const { sendRef, userRef, method } = requestConfig;
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

    method === 'set' ? set(postRef, tasks) : update(postRef, tasks);
    await set(userRef, { categories: categories });
  };

  return { sendRequest };
};

export default usePost;
