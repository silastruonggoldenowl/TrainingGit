import AUTH from "../constans/authConstans";

export const logInAction = (data) => {
  return {
    type: AUTH.LOG_IN,
    data,
  };
};

export const logOutAction = () => {
  return {
    type: AUTH.LOG_OUT,
  };
};
