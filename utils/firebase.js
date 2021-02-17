import firebase from "firebase/app";
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyAVv9Rqk7U8bOdx9RxqAUDWmmqRAN5UV5c",
    authDomain: "cavstax-com.firebaseapp.com",
    projectId: "cavstax-com",
    storageBucket: "cavstax-com.appspot.com",
    messagingSenderId: "588642994242",
    appId: "1:588642994242:web:82b79f3ebd970d5f1f05db",
    measurementId: "G-TF9K4SPQJ0"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
const fire = firebase;
export default fire;