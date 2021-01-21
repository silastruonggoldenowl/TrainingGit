import AUTH from "../constans/authConstans";

export const signInAction = (data) => {
  return {
    type: AUTH.SIGN_IN,
    data,
  };
};

export const signOutAction = () => {
  return {
    type: AUTH.SIGN_OUT,
  };
};

export const signUpAction = () => {
  return {
    type: AUTH.SIGN_UP,
  };
};

export const signInWithFbAction = (data) => {
  return {
    type: AUTH.SIGN_IN_WITH_FB,
    data,
  };
};
