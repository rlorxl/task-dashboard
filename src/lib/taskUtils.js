export const createTaskKey = (data, date) => {
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
