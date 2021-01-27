import STASK from "../constans/staskConstans";
import AUTH from "../constans/authConstans";

function loading(state) {
  return {
    ...state,
    loading: true,
  };
}

function onClickTickAll(state) {
  const dataState = { ...state.data };
  let check;

  if (Object.values(dataState).every((item) => item.isTick === true)) {
    check = false;
  } else {
    check = true;
  }

  Object.values(dataState).forEach((item) => {
    dataState[item.id].isTick = check;
  });
  return {
    ...state,
    data: dataState,
  };
}

function onClickTick(state, id) {
  return {
    ...state,
    data: {
      ...state.data,
      [id]: {
        ...state.data[id],
        isTick: !state.data[id].isTick,
      },
    },
  };
}

function deleteStaskReducer(state, id) {
  const dataState = { ...state.data };
  delete dataState[id];
  return {
    ...state,
    data: dataState,
  };
}

function addStaskReducer(state, data) {
  return {
    ...state,
    data: {
      ...state.data,
      [data.id]: data,
    },
  };
}

function deleteCompleteStaskReducer(state) {
  const dataState = { ...state.data };
  Object.values(dataState).forEach((item) => {
    if (item.isTick === true) {
      delete dataState[item.id];
    }
  });
  return {
    ...state,
    data: dataState,
  };
}

function saveAllStaskReducer(state) {
  return {
    ...state,
    data: {},
  };
}

function getStaskSuccessReducer(state, response) {
  return {
    // ...state,
    data: response.data.stask,
    loading: false,
  };
}

function handlerErrorReducer(state, err) {
  return {
    ...state,
    loading: false,
    error: err,
  };
}

function onClickTickSaveLocal(state, data, saved) {
  if (!saved) {
    return deleteStaskReducer(state, data.id);
  }
  return addStaskReducer(state, {
    ...data,
    savedFirebase: false,
  });
}

function handlerResetStore(state) {
  return {
    ...state,
    data: undefined,
  };
}

export function staskLocalReducer(state = { data: {} }, action) {
  switch (action.type) {
    case AUTH.SIGN_OUT:
      return handlerResetStore(state);
    case STASK.TICK_SAVE:
      return onClickTickSaveLocal(state, action.data, action.saved);
    case STASK.SAVE_ALL_SUCCESS:
      return saveAllStaskReducer(state);
    case STASK.ADD:
      return addStaskReducer(state, action.data);
    case STASK.DELETE:
      return deleteStaskReducer(state, action.data);
    case STASK.TICK_COMPLETE:
      return onClickTick(state, action.data);
    case STASK.TICK_ALL:
      return onClickTickAll(state);
    case STASK.DELETE_COMPLETE_STASK:
      return deleteCompleteStaskReducer(state);
    default:
      return state;
  }
}

function handlerDeleteFirebaseSuccess(state, id) {
  const dataState = { ...state.data };
  delete dataState[id];
  return {
    ...state,
    data: dataState,
    loading: false,
  };
}

function handlerUpdateStaskFirebase(state, response) {
  return {
    ...state,
    data: {
      ...state.data,
      [response.data.id]: {
        ...response.data,
        savedFirebase: true,
      },
    },
    loading: false,
  };
}

function handlerUpdateAllStaskFirebaseSuccess(state, response) {
  return {
    ...state,
    data: response.data,
    loading: false,
  };
}

export function staskFirebaseReducer(state = { data: {} }, action) {
  switch (action.type) {
    case STASK.TICK_SAVE:
    case STASK.TICK_ALL:
    case STASK.GET_STASK:
    case STASK.SAVE_ALL:
    case STASK.DELETE_FIREBASE:
    case STASK.DELETE_COMPLETE_STASK:
    case STASK.TICK_FIREBASE_COMPLETE:
      return loading(state);
    case STASK.GET_STASK_ERROR:
    case STASK.UPDATE_STASK_ERROR:
    case STASK.DELETE_COMPLETE_STASK_ERROR:
    case STASK.DELETE_FIREBASE_ERROR:
    case STASK.TICK_SAVE_ERROR:
    case STASK.TICK_ALL_ERROR:
      return handlerErrorReducer(state, action.data);
    case STASK.GET_STASK_SUCCESS:
      return getStaskSuccessReducer(state, action.data);
    case STASK.UPDATE_STASK_SUCCESS:
      return handlerUpdateStaskFirebase(state, action.data);
    case STASK.DELETE_FIREBASE_SUCCESS:
      return handlerDeleteFirebaseSuccess(state, action.id);
    case STASK.DELETE_COMPLETE_STASK_SUCCESS:
    case STASK.TICK_ALL_SUCCESS:
    case STASK.SAVE_ALL_SUCCESS:
      return handlerUpdateAllStaskFirebaseSuccess(state, action.data);
    case AUTH.SIGN_OUT:
      return handlerResetStore(state);
    default:
      return state;
  }
}

export default {
  staskFirebaseReducer,
  staskLocalReducer,
};
