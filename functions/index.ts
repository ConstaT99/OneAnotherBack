/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB1v2nxxvYW6ev00O7-dw0Rf3rj3tCuTQQ",
  authDomain: "oneanother-757c7.firebaseapp.com",
  databaseURL: "https://oneanother-757c7-default-rtdb.firebaseio.com",
  projectId: "oneanother-757c7",
  storageBucket: "oneanother-757c7.appspot.com",
  messagingSenderId: "709418907052",
  appId: "1:709418907052:web:1833085b00a6380995f609",
  measurementId: "G-SZQBVZ3NWY",
};

export const project = admin.initializeApp(config);
admin.auth();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export * from "./func/template/helloWorld";// Hello Wrold function
// export * from "./func/template/addFuncExample";// add Example Function
