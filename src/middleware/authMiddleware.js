import axios from "axios";

export function getStaskDatabase(id) {
  return axios.get(
    `https://${process.env.REACT_APP_FIREBASE_DOMAIN}/${id}.json?auth=${process.env.REACT_APP_FIREBASE_AUTH}`
  );
}

export function putFullStaskDatabase(id, data) {
  return axios.put(
    `https://${process.env.REACT_APP_FIREBASE_DOMAIN}/${id}/stask.json/?auth=${process.env.REACT_APP_FIREBASE_AUTH}`,
    data
  );
}

export function putStaskDatabase(id, data) {
  return axios.put(
    `https://${process.env.REACT_APP_FIREBASE_DOMAIN}/${id}/stask/${data.id}.json/?auth=${process.env.REACT_APP_FIREBASE_AUTH}`,
    data
  );
}

export function deleteStaskDatabase(id, data) {
  return axios.delete(
    `https://${process.env.REACT_APP_FIREBASE_DOMAIN}/${id}/stask/${data.id}.json?auth=${process.env.REACT_APP_FIREBASE_AUTH}`
  );
}

export function postStaskDatabase(id, idStask, data) {
  return axios.post(
    `https://${process.env.REACT_APP_FIREBASE_DOMAIN}/${id}/stask/${idStask}.json/?auth=${process.env.REACT_APP_FIREBASE_AUTH}`,
    data
  );
}
