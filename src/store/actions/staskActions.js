import STASK from "../constans/staskConstans";
import {
  getStaskDatabase,
  putStaskDatabase,
  deleteStaskDatabase,
  putFullStaskDatabase,
} from "../../middleware/authMiddleware";

export const addStask = (data) => ({
  type: STASK.ADD,
  data,
});

export const getStaskSuccess = (data) => ({
  type: STASK.GET_STASK_SUCCESS,
  data,
});

export const getStaskError = (error) => ({
  type: STASK.GET_STASK_ERROR,
  error,
});

export const updateStask = (data) => ({
  type: STASK.UPDATE_STASK,
  data,
});

export const updateStaskSuccess = (data) => ({
  type: STASK.UPDATE_STASK_SUCCESS,
  data,
});

export const updateStaskError = (data) => ({
  type: STASK.UPDATE_STASK_ERROR,
  data,
});

export const deleteCompleteStaskSuccess = (data) => ({
  type: STASK.DELETE_COMPLETE_STASK_SUCCESS,
  data,
});

export const deleteCompleteStaskError = (error) => ({
  type: STASK.DELETE_COMPLETE_STASK_ERROR,
  error,
});

export const saveAllStaskSuccess = (data) => ({
  type: STASK.SAVE_ALL_SUCCESS,
  data,
});

export const saveAllStaskError = (error) => ({
  type: STASK.SAVE_ALL_ERROR,
  error,
});

export const putFullStask = (id, data) => {
  const dataState = { ...data };
  Object.values(dataState).forEach((item) => {
    dataState[item.id].savedFirebase = true;
    delete dataState[item.id].savedFirebase;
  });
  return (dispatch) => {
    dispatch({ type: STASK.SAVE_ALL });
    putFullStaskDatabase(id, dataState)
      .then((result) => dispatch(saveAllStaskSuccess(result)))
      .catch((err) => dispatch(saveAllStaskError(err)));
  };
};

export const deleteAllStask = (id, data) => {
  const dataState = { ...data };
  Object.values(dataState).forEach((item) => {
    if (item.isTick === true) {
      delete dataState[item.id];
    }
  });
  return (dispatch) => {
    dispatch({
      type: STASK.DELETE_COMPLETE_STASK,
    });
    putFullStaskDatabase(id, dataState)
      .then((result) => dispatch(deleteCompleteStaskSuccess(result)))
      .catch((err) => dispatch(deleteCompleteStaskError(err)));
  };
};

// check

export const deleteStaskFirebaseSuccess = (data, id) => ({
  type: STASK.DELETE_FIREBASE_SUCCESS,
  data,
  id,
});

export const deleteStaskFirebaseError = (error) => ({
  type: STASK.DELETE_FIREBASE_ERROR,
  error,
});

export const getStask = (uid) => {
  return (dispatch) => {
    dispatch({ type: STASK.GET_STASK });
    getStaskDatabase(uid)
      .then((result) => dispatch(getStaskSuccess(result)))
      .catch((error) => dispatch(getStaskError(error)));
  };
};

export const tickSave = (id, data, saved) => {
  if (saved) {
    return (dispatch) => {
      dispatch({ type: STASK.TICK_SAVE, data, saved });
      deleteStaskDatabase(id, data)
        .then((result) => dispatch(deleteStaskFirebaseSuccess(result, data.id)))
        .catch((err) => dispatch(deleteStaskFirebaseError(err)));
    };
  }
  return (dispatch) => {
    dispatch({ type: STASK.TICK_SAVE, data, saved });
    putStaskDatabase(id, data)
      .then((result) => dispatch(updateStaskSuccess(result)))
      .catch((err) => dispatch(updateStaskError(err)));
  };
};

export const deleteStask = (id, data) => {
  if (data.savedFirebase) {
    return (dispatch) => {
      dispatch({
        type: STASK.DELETE_FIREBASE,
        data,
      });
      deleteStaskDatabase(id, data)
        .then((result) => dispatch(deleteStaskFirebaseSuccess(result, data.id)))
        .catch((err) => dispatch(deleteStaskFirebaseError(err)));
    };
  }
  return {
    type: STASK.DELETE,
    data: data.id,
  };
};

export const tickAllStaskSuccess = (data) => ({
  type: STASK.TICK_ALL_SUCCESS,
  data,
});

export const tickAllStaskError = (error) => ({
  type: STASK.TICK_ALL_ERROR,
  error,
});

export const tickAll = (id, data, everyTrue) => {
  const dataState = { ...data };
  Object.values(dataState).forEach((item) => {
    dataState[item.id].isTick = !everyTrue;
    delete dataState[item.id].savedFirebase;
  });
  return (dispatch) => {
    dispatch({
      type: STASK.TICK_ALL,
    });
    putFullStaskDatabase(id, dataState)
      .then((result) => dispatch(tickAllStaskSuccess(result)))
      .catch((err) => dispatch(tickAllStaskError(err)));
  };
};

export const tick = (id, data, saved) => {
  if (saved) {
    return (dispatch) => {
      dispatch({
        type: STASK.TICK_FIREBASE_COMPLETE,
      });
      putStaskDatabase(id, { ...data, isTick: !data.isTick })
        .then((result) => dispatch(updateStaskSuccess(result)))
        .catch((err) => dispatch(updateStaskError(err)));
    };
  }
  return {
    type: STASK.TICK_COMPLETE,
    data: data.id,
  };
};
