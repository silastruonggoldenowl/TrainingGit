import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUTKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.log(error);
}

const FBProvider = new firebase.auth.FacebookAuthProvider();
FBProvider.addScope("user_birthday");
FBProvider.setCustomParameters({
  display: "popup",
});

export default { firebase, FBProvider };
