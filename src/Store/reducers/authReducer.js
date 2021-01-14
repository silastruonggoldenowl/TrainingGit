import AUTH from "../constans/authConstans";
// import handlerSignInWithFB from "../../middleware/authMiddleware";
// import firebaseConfig from "../../firebaseConfig";

function handlerLogIn(state, data) {
  if (data.email) {
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

function handlerLogUp(state) {
  return {
    ...state,
    signIn: true,
  };
}

function handlerSignInWithFB(state, data) {
  if (data) {
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

export default function authReducer(state = { signIn: false }, action) {
  switch (action.type) {
    case AUTH.SIGN_IN:
      return handlerLogIn(state, action.data);
    case AUTH.SIGN_OUT:
      return handlerLogOut(state);
    case AUTH.SIGN_UP:
      return handlerLogUp(state);
    case AUTH.SIGN_IN_WITH_FB:
      return handlerSignInWithFB(state, action.data);
    default:
      return state;
  }
}
