import axios from "axios";

export function getStaskDatabase(id) {
  return axios.get(
    `https://todos-758f8-default-rtdb.firebaseio.com/${id}.json?auth=tMP42bwtqN09D5oxY12YkLsDCJZZEq9RWMGYGLNA`
  );
}

export function putFullStaskDatabase(id, data) {
  return axios.put(
    `https://todos-758f8-default-rtdb.firebaseio.com/${id}/stask.json/?auth=tMP42bwtqN09D5oxY12YkLsDCJZZEq9RWMGYGLNA`,
    data
  );
}

export function putStaskDatabase(id, data) {
  return axios.put(
    `https://todos-758f8-default-rtdb.firebaseio.com/${id}/stask/${data.id}.json/?auth=tMP42bwtqN09D5oxY12YkLsDCJZZEq9RWMGYGLNA`,
    data
  );
}

export function deleteStaskDatabase(id, data) {
  return axios.delete(
    `https://todos-758f8-default-rtdb.firebaseio.com/${id}/stask/${data.id}.json?auth=tMP42bwtqN09D5oxY12YkLsDCJZZEq9RWMGYGLNA`
  );
}

export function postStaskDatabase(id, idStask, data) {
  return axios.post(
    `https://todos-758f8-default-rtdb.firebaseio.com/${id}/stask/${idStask}.json/?auth=tMP42bwtqN09D5oxY12YkLsDCJZZEq9RWMGYGLNA`,
    data
  );
}
