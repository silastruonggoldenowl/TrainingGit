// import { uuid } from "uuidv4";
// import firebaseConfig from "../firebaseConfig";

// function handlerSignInWithFB(data) {
//   const username = data.split("@");
//   firebaseConfig.firebase
//     .database()
//     .ref(`/"${username[0]}"`)
//     .once("value")
//     .then((result) => (result.val() ? console.log(true) : console.log(false)));
//   return {};
// }

// export function handlerSignUpWithFB(data) {
//   firebaseConfig.firebase
//     .database()
//     .ref(`/${data.email}`)
//     .set({
//       email: data.email,
//       username: data.name,
//       id: uuid(),
//       stask: {},
//     })
//     .then((result) => console.log(result));
//   return {};
// }

// export function handlerSignInWithEmail(data) {
//   firebaseConfig.firebase
//     .auth()
//     .signInWithEmailAndPassword(data.email, data.password)
//     .then((result) => console.log(result));

//   return {};
// }

// export default handlerSignInWithFB;
