import AUTH from "../constans/authConstans";

function handlerLogIn(state, data) {
  if (data.email === "user@mail.com" && data.password === "123456") {
    return {
      ...state,
      signIn: true,
    };
  }
  return {
    ...state,
    signIn: false,
  };
}

function handlerLogOut(state) {
  return {
    ...state,
    signIn: false,
  };
}

export default function authReducer(state = { signIn: false }, action) {
  switch (action.type) {
    case AUTH.LOG_IN:
      return handlerLogIn(state, action.data);
    case AUTH.LOG_OUT:
      return handlerLogOut(state);
    default:
      return state;
  }
}
