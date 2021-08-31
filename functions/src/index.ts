/* eslint-disable no-unused-vars */
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
entry point for all cloud function, please follow the layout dispaly in the template section
*/

// Template for writing in index.ts before deploy functions
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
// post Functions
import addPostFunc from '../func/post/addPostFunc';
import deletePostFunc from '../func/post/deletePostFunc';
import readPostFunc from '../func/post/readPostFunc';
import updatePostFunc from '../func/post/updatePostFunc';
import getPicOfPostFunc from '../func/post/getPicOfPost';

// tag Functions
import addTagFunc from '../func/tag/addTagFunc';
import deletePostFromTagFunc from '../func/tag/deletePostFromTagFunc';
import getTagByIdFunc from '../func/tag/getTagById';
import isTagExistsFunc from '../func/tag/isTagExists';
import updateTagFunc from '../func/tag/updateTagFunc';
import updateTagStatFunc from '../func/tag/updateTagStat';

// common
import deleteFileFunc from '../func/common/deleteFileFunc';
import getFileUrlFunc from '../func/common/getFileUrlFunc';
import isUserExistsFunc from '../func/common/isUserExists';
import uploadFileFunc from '../func/common/uploadFileFunc';

// categories
import deletePostFromCatFunc from '../func/categories/deletePostFromCatFunc';
import getPostsByCatFunc from '../func/categories/getPostsByCatFunc';
import isCatExistsFunc from '../func/categories/isCatExists';
import updateCatFunc from '../func/categories/updateCatFunc';

// hello world
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

// post collection
export const addPost = addPostFunc;
export const deletePost = deletePostFunc;
export const readPost = readPostFunc;
export const updatePost = updatePostFunc;
export const getPicOfPost = getPicOfPostFunc;

// tag collection
export const addTag = addTagFunc;
export const deletePostFromTag = deletePostFromTagFunc;
export const getTagById = getTagByIdFunc;
export const isTagExists = isTagExistsFunc;
export const updateTag = updateTagFunc;
export const updateTagStat = updateTagStatFunc;

// common folder
export const deleteFile = deleteFileFunc;
export const getFileUrl = getFileUrlFunc;
export const isUserExists = isUserExistsFunc;
export const uploadFile = uploadFileFunc;

// categories

export const deletePostFromCat = deletePostFromCatFunc;
export const getPostsByCat = getPostsByCatFunc;
export const isCatExists = isCatExistsFunc;
export const updateCat = updateCatFunc;

// entry point for all functions
