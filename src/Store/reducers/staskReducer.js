import { uuid } from "uuidv4";
import { STASK } from "../constans";

export default (state = {data:[]}, action) => {
    switch (action.type){
        case STASK.GET_STASK:
            return getStaskReducer(state)
        case STASK.ADD:
            return addStaskReducer(state, action.data)
        case STASK.DELETE:
            return deleteStaskReducer(state, action.data)
        case STASK.TICK_COMPLETE:
            return onClickTick(state, action.data)
        case STASK.TICK_ALL:
            return onClickTickAll(state)
        case STASK.DELETE_ALL:
            return deleteAllStaskReducer(state)
        // case STASK.GET_STASK_IN_PROCCESS:
        //     return getStaskInprocess(state,action.data)
        // case STASK.GET_STASK_ERROR:
        //     return errorHandler(state, action.error)
        default:
            return state
    }
}

function getStaskReducer(state, data) {
    return {
        ...state,
        data: state.data
    }
}

function onClickTickAll(state){
    let dataState = state.data
    let check
    
    if( dataState.every((item)=>item.isTick === true))
        check = false
    else
        check = true

        dataState = dataState.map((item) => {
            item.isTick = check 
            return item
        })
    return {
        ...state,
        data: dataState
    }
}

function onClickTick(state, data){
    let dataState = state.data
    let index = findIndexItems(dataState, data)
    dataState[index].isTick = !dataState[index].isTick
    return {
        ...state,
        data: dataState
    }
}

function findIndexItems(data, id){
    return data.findIndex(item => item.id === id);
}

function deleteStaskReducer(state, id){
    let dataState = state.data;
    dataState = dataState.filter(item => item.id !== id)
    return {
        ...state,
        data: dataState
    }
}

function addStaskReducer(state, data){
    let dataState = state.data;
    dataState.push(data)
    return {
        ...state,
        data: dataState
    }
}

function deleteAllStaskReducer(state) {
    let dataState = state.data;
    dataState = dataState.filter((item) => item.isTick !== true)
    return {
        ...state,
        data: dataState
    }
}

// var mockData = [
//     {
//         id: uuid(),
//         name: "messss",
//         isTick: true
//     },
//     {
//         id: uuid(),
//         name: "test",
//         isTick: false
//     },
//     {
//         id: uuid(),
//         name: "test1",
//         isTick: true
//     }
// ]