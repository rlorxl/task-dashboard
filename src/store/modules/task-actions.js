import * as taskUtils from '../../lib/taskUtils';
import { taskActions } from './task-slice';

export const handleAsyncActions = (type, payload) => {
  return async (dispatch) => {
    const asyncFunc = (type) => {
      switch (type) {
        case 'SEND':
          taskUtils.sendTaskData(payload);
          break;
        case 'GET':
          taskUtils.getTasks({ dispatch, payload });
          break;
        case 'UPDATE':
          taskUtils.updateTask(payload);
          break;
        case 'EDIT':
          taskUtils.editGoal(payload);
          break;
        case 'CATEGORY':
          taskUtils.getCategories({ dispatch, payload });
          break;
      }
    };
    try {
      asyncFunc(type);
      dispatch(
        taskActions.setNotification({
          status: `${type}_TASKS_SUCCESS`,
          message: null,
        })
      );
    } catch (error) {
      dispatch(
        taskActions.setNotification({
          status: `${type}_TASKS_FAILED`,
          message: error.message,
        })
      );
    }
  };
};
