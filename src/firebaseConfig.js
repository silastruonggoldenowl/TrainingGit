import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUbxqPWhfnnu5QmI5A-eEqpObYscgHAmw",
  authDomain: "todos-758f8.firebaseapp.com",
  projectId: "todos-758f8",
  storageBucket: "todos-758f8.appspot.com",
  messagingSenderId: "462299749320",
  appId: "1:462299749320:web:89275c440dbc04301e7efd",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.log(error);
}

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("user_birthday");
provider.setCustomParameters({
  display: "popup",
});

export default { firebase, provider };
