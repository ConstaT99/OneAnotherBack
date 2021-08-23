/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// declare module '*.jpg';

/*
entry point for all cloud function, please follow the layout dispaly in the template section
*/

// Template for writing in index.ts before deploy functions
// Hello World function

// video Functions from '../func/video/'
import addFuncVideo from '../func/video/addVideoFunc';
import deleteFuncVideo from '../func/video/deleteVideoFunc';
// user Function from '../func/user'
import addUserFunc from '../func/user/addUserFunc';
import readUserFunc from '../func/user/readUserFunc';
import updateUserFunc from '../func/user/updateUserFunc';
import deleteUserFunc from '../func/user/deleteUserFunc';
// school Functions
import addSchoolFunc from '../func/school/addSchoolFunc';
import deleteSchoolFunc from '../func/school/deleteSchoolFunc';
import getAllSchoolFunc from '../func/school/getAllSchoolFunc';
import getAvatarByNameFunc from '../func/school/getAvatarByNameFunc';
import getSchoolByIdFunc from '../func/school/getSchoolByIdFunc';
import updateSchoolFunc from '../func/school/updateSchoolFunc';

export * from '../func/template/helloWorld';

// video
export const addVideo = addFuncVideo;
export const deleteVideo = deleteFuncVideo;
// user collection
export const addUser = addUserFunc;
export const readUser = readUserFunc;
export const updateUser = updateUserFunc;
export const deleteUser = deleteUserFunc;
// school collection
export const addSchool = addSchoolFunc;
export const deleteSchool = deleteSchoolFunc;
export const getAllSchool = getAllSchoolFunc;
export const getSchoolAvatarByName = getAvatarByNameFunc;
export const getSchool = getSchoolByIdFunc;
export const updateSchool = updateSchoolFunc;

// entry point for all functions
