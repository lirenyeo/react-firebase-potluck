import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyArnRz-RINjv3-9RFS9shlYo31_M3S42JE",
  authDomain: "react-potlucklist.firebaseapp.com",
  databaseURL: "https://react-potlucklist.firebaseio.com",
  projectId: "react-potlucklist",
  storageBucket: "",
  messagingSenderId: "1030882237915"
};
var fire = firebase.initializeApp(config);
export default fire;
