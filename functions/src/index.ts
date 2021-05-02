/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// declare module '*.jpg';

/*
entry point for all cloud function, please follow the layout dispaly in the template section
*/

// Teamplate for writing in index.ts before deploy functions
// Hello Wrold function

// add Example Function
import addFuncExample from '../func/template/addFuncExample';
import readFuncExample from '../func/template/readFuncExample';
import deleteFuncExample from '../func/template/deleteFuncExamlple';
// import updateFuncExample from '../func/template/updateFuncExample';

// video Functions from '../func/video/'
import addFuncVideo from '../func/video/addVideoFunc';
import deleteFuncVideo from '../func/video/deleteVideoFunc';


// Hello Wrold function
export * from '../func/template/helloWorld';// read Example Function

// template example
export const addExample = addFuncExample;
export const readExample = readFuncExample;
export const deleteExample = deleteFuncExample;
// export const updateExample = updateFuncExample;

// video
export const addVideo = addFuncVideo;
export const deleteVideo = deleteFuncVideo;

// entry point for all functions
