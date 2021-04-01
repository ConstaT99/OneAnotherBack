/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
entry point for all cloud function, please follow the layout dispaly in the template section
*/

// Teamplate for writing in index.ts before deploy functions
export * from "./func/template/helloWorld";// Hello Wrold function
import addFuncExample from "./func/template/addFuncExample";// add Example Function
import readFuncExample from "./func/template/readFuncExample";// read Example Function

// template example
export const addExample = addFuncExample;
export const readExample = readFuncExample;

// entry point for all function