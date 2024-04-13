import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAiIyjN-yhHzzWvdaw20xEK0fNkfPf9E5k",
  authDomain: "crud-firebase-985da.firebaseapp.com",
  databaseURL: "https://crud-firebase-985da-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-985da",
  storageBucket: "crud-firebase-985da.appspot.com",
  messagingSenderId: "993521703492",
  appId: "1:993521703492:web:2ebb2516c47e65236e7a11"
};
  // Initialize Firebase
var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();