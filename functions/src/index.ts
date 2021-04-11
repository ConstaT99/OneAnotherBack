/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
entry point for all cloud function, please follow the layout dispaly in the template section
*/

// Teamplate for writing in index.ts before deploy functions

import addFuncExample from '../func/template/addFuncExample';
import readFuncExample from '../func/template/readFuncExample';
import deleteFuncExample from '../func/template/deleteFuncExamlple';

// export helloworld function
export { helloWorld } from '../func/template/helloWorld';
// template example
export const addExample = addFuncExample;
export const readExample = readFuncExample;
export const deleteExample = deleteFuncExample;
// entry point for all functions
