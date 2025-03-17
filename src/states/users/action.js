import api from '../../utils/api-test';

const ActionType = {
  RECEIVE_USERS: 'users/recieve',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

function asyncRecieveAllUsers() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();

      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
  asyncRecieveAllUsers,
};