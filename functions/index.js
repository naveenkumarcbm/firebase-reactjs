const functions = require('firebase-functions');
const express = require('express');
const app = express();
const firebase = require('firebase');

var firebaseConfig = {
  apiKey: "AIzaSyBgnsBE2UAoWBSC44cKSdW4Bs665EUX97w",
  authDomain: "navvani.firebaseapp.com",
  databaseURL: "https://navvani.firebaseio.com",
  projectId: "navvani",
  storageBucket: "navvani.appspot.com",
  messagingSenderId: "317790117599",
  appId: "1:317790117599:web:1f1f5200b6bfd30de0d36a",
  measurementId: "G-2MQVXV5QQD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const toDoRouter = require('./routers/todos/index');
const userRouter = require('./routers/users/index');

const CONSTANTS = require('./constants/index');

//Register router
app.use(`/${CONSTANTS.BASE_COLLECTION}`, toDoRouter);
app.use(`/${CONSTANTS.USER_URL}`, userRouter);

// app.listen(3000, () => console.log('Server started'))
exports.api = functions.https.onRequest(app);
