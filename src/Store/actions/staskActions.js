import STASK from "../constans/staskConstans";

export const addStask = (data) => ({
  type: STASK.ADD,
  data,
});

export const deleteStask = (data) => ({
  type: STASK.DELETE,
  data,
});

export const tick = (data) => ({
  type: STASK.TICK_COMPLETE,
  data,
});

export const tickAll = () => ({
  type: STASK.TICK_ALL,
});

export const deleteAllStask = (data) => ({
  type: STASK.DELETE_ALL,
  data,
});

export const getStask = () => ({
  type: STASK.GET_STASK,
});

export const getStaskInProcess = (data) => ({
  type: STASK.GET_STASK_IN_PROCCESS,
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
