import firebase from 'firebase'
var config = {
  databaseURL: 'https://react-potlucklist.firebaseio.com/'
};
var fire = firebase.initializeApp(config);
export default fire;
