// import { data } from "autoprefixer"
// import { put, takeEvery } from "redux-saga/effects"
// import { STASK } from '../Store/constans'

// import {
//     getStaskInProcess,
//     getStaskError
// } from '../Store/actions'

// function * getStaskHandler(){
//     try{
//         data = mockData
//         yield(put(getStaskInProcess(data)))
//     } catch (e){
//         yield(put(getStaskError(data)))
//     }
// }

// export default function* staskHandler(){
//     yield takeEvery(STASK.GET_STASK, getStaskHandler)
// }

// mockData = [
//     {
//         id: 1,
//         name: "test1",
//         isTick: true
//     },
//     {
//         id: 2,
//         name: "test2",
//         isTick: false
//     },
//     {
//         id: 3,
//         name: "test3",
//         isTick: false
//     },
//     {
//         id: 1,
//         name: "test1",
//         isTick: true
//     },
// ]