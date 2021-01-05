import { STASK } from '../constans'

export const addStask = (data) => {
    return {
        type: STASK.ADD,
        data: data
    }
}

export const deleteStask = (data) => {
    return {
        type: STASK.DELETE,
        data: data
    }
}

export const tick = (data) => {
    return {
        type: STASK.TICK_COMPLETE,
        data: data
    }
}

export const tickAll = () => {
    return {
        type: STASK.TICK_ALL
    }
}

export const deleteAllStask = (data) => {
    return {
        type: STASK.DELETE_ALL,
        data: data
    }
}

export const getStask = () => {
    return {
        type: STASK.GET_STASK
    }
}

export const getStaskInProcess = (data) => {
    return {
        type: STASK.GET_STASK_IN_PROCCESS,
        data: data
    }
}

export const getStaskError = (error) => {
    return {
        type: STASK.GET_STASK_ERROR,
        error: error
    }
}

export const updateStask = (data) => {
    return {
        type: STASK.UPDATE_STASK,
        data: data
    }
}