import STASK from "../constans/staskConstans";

function getStaskReducer(state) {
  return {
    ...state,
    data: state.data,
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
  const dataState = { ...state.data };
  dataState[data.id] = data;
  return {
    ...state,
    data: {
      ...state.data,
      [data.id]: data,
    },
  };
}

function deleteAllStaskReducer(state) {
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

export default function staskReducer(state = { data: {} }, action) {
  switch (action.type) {
    case STASK.GET_STASK:
      return getStaskReducer(state);
    case STASK.ADD:
      return addStaskReducer(state, action.data);
    case STASK.DELETE:
      return deleteStaskReducer(state, action.data);
    case STASK.TICK_COMPLETE:
      return onClickTick(state, action.data);
    case STASK.TICK_ALL:
      return onClickTickAll(state);
    case STASK.DELETE_ALL:
      return deleteAllStaskReducer(state);
    // case STASK.GET_STASK_IN_PROCCESS:
    //     return getStaskInprocess(state,action.data)
    // case STASK.GET_STASK_ERROR:
    //     return errorHandler(state, action.error)
    default:
      return state;
  }
}
