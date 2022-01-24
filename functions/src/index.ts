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
import addNewFolderFunc from '../func/user/addNewFolderFunc';
import deleteFolderFunc from '../func/user/deleteFolderFunc';

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
import readMultipleHotPostsFunc from '../func/post/readMultipleHotPostsFunc';
import readMultipleRandomPostsFunc from '../func/post/readMultipleRandomPostsFunc';

// tag Functions
import addTagFunc from '../func/tag/addTagFunc';
import deletePostFromTagFunc from '../func/tag/deletePostFromTagFunc';
import getTagByIdFunc from '../func/tag/getTagByIdFunc';
import isTagExistsFunc from '../func/tag/isTagExistsFunc';
import updateTagFunc from '../func/tag/updateTagFunc';
import updateTagStatFunc from '../func/tag/updateTagStat';
import getAllTagsFunc from '../func/tag/getAllTagsFunc';
import getPostsByTagFunc from '../func/tag/getPostsByTagFunc';
import getTagsByUidFunc from '../func/tag/getTagsByUidFunc';
import removeSavedTagsFunc from '../func/tag/removeSavedTagsFunc';
import saveTagFunc from '../func/tag/saveTagFunc';

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

// comment
import addCommentFunc from '../func/comment/addCommentFunc';
import addLikeCommentFunc from '../func/comment/addLikeCommentFunc';
import addLikePostFunc from '../func/comment/addLikePostFunc';
import deleteCommentFunc from '../func/comment/deleteCommentFunc';
import getCommentFunc from '../func/comment/getCommentFunc';
import getDirectCommentFunc from '../func/comment/getDirectCommentFunc';
import getSavedPostsFunc from '../func/comment/getSavedPostsFunc';
import getSubCommentFunc from '../func/comment/getSubCommentFunc';
import removeLikeCommentFunc from '../func/comment/removeLikeCommentFunc';
import removeLikePostFunc from '../func/comment/removeLikePostFunc';
import removeSavedPostFunc from '../func/comment/removeSavedPostFunc';
import savePostFunc from '../func/comment/savePostFunc';
import updateRepliedCommentFunc from '../func/comment/updateRepliedCommentFunc';
import updateRepliedPostFunc from '../func/comment/updateRepliedPostFunc';
import updateRepliedProductBuyFunc from '../func/comment/updateRepliedProductBuyFunc';
import updateRepliedProductSellFunc from '../func/comment/updateRepliedProductSellFunc';

// hot-tags
import getHotTagsInOneDayFunc from '../func/hot-tags/getHotTagsInOneDayFunc';
import getHotTagsInOneMonthFunc from '../func/hot-tags/getHotTagsInOneMonthFunc';
import getHotTagsInOneWeekFunc from '../func/hot-tags/getHotTagsInOneWeekFunc';
import getPostScoreFunc from '../func/hot-tags/getPostScoreFunc';
import getTagScoreFunc from '../func/hot-tags/getTagScoreFunc';
import getTenHotTagsFunc from '../func/hot-tags/getTenHotTagsFunc';
import updatePostScoreFunc from '../func/hot-tags/updatePostScoreFunc';
import updateTagScoreFunc from '../func/hot-tags/updateTagScoreFunc';

// order
import createOrderFunc from '../func/Order/createOrderFunc';
import deleteOrderFunc from '../func/Order/deleteOrderFunc';
import readOrderFunc from '../func/Order/readOrderFunc';
import updateOrderStageFunc from '../func/Order/updateOrderStageFunc';

// product Buy
import createProdBuyFunc from '../func/productBuy/createProdBuyFunc';
import deleteProdBuyFunc from '../func/productBuy/deleteProdBuyFunc';
import readMultipleRandomBuyFunc from '../func/productBuy/readMultipleRandomBuyFunc';
import readProdBuyFunc from '../func/productBuy/readProdBuyFunc';
import updateProdBuyFunc from '../func/productBuy/updateProdBuyFunc';

// product sell
import createSellProductFunc from '../func/productSell/createSellProductFunc';
import deleteSellProductFunc from '../func/productSell/deleteSellProductFunc';
import readMultipleRandomSellFunc from '../func/productSell/readMultipleRandomSellFunc';
import readSellProductFun from '../func/productSell/readSellProductFun';
import updateSellProductFunc from '../func/productSell/updateSellProductFunc';

// search
import searchPostsFunc from '../func/search/searchPostsFunc';
import searchProductsFunc from '../func/search/searchProductsFunc';
import searchTagFunc from '../func/search/searchTagFunc';
import searchUserFunc from '../func/search/searchUserFunc';

// hello world
export * from '../func/template/helloWorld';

// onRequest Template
export * from '../func/template/onRequest';

// video
export const addVideo = addFuncVideo;
export const deleteVideo = deleteFuncVideo;

// user collection
export const addUser = addUserFunc;
export const readUser = readUserFunc;
export const updateUser = updateUserFunc;
export const deleteUser = deleteUserFunc;
export const addNewFolder = addNewFolderFunc;
export const deleteFolder = deleteFolderFunc;

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
export const readMultipleHotPosts = readMultipleHotPostsFunc;
export const readMultipleRandomPosts = readMultipleRandomPostsFunc;

// tag collection
export const addTag = addTagFunc;
export const deletePostFromTag = deletePostFromTagFunc;
export const getTagById = getTagByIdFunc;
export const isTagExists = isTagExistsFunc;
export const updateTag = updateTagFunc;
export const updateTagStat = updateTagStatFunc;
export const getAllTags = getAllTagsFunc;
export const getPostsByTag = getPostsByTagFunc;
export const getTagsByUid = getTagsByUidFunc;
export const removeSavedTags = removeSavedTagsFunc;
export const saveTag = saveTagFunc;

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

// comment
export const addComment = addCommentFunc;
export const addLikeComment = addLikeCommentFunc;
export const addLikePost = addLikePostFunc;
export const deleteComment = deleteCommentFunc;
export const getComment = getCommentFunc;
export const getDirectComment = getDirectCommentFunc;
export const getSavedPosts = getSavedPostsFunc;
export const getSubComment = getSubCommentFunc;
export const removeLikeComment = removeLikeCommentFunc;
export const removeLikePost = removeLikePostFunc;
export const removeSavedPost = removeSavedPostFunc;
export const savePost = savePostFunc;
export const updateRepliedComment = updateRepliedCommentFunc;
export const updateRepliedPost = updateRepliedPostFunc;
export const updateRepliedProductBuy = updateRepliedProductBuyFunc;
export const updateRepliedProductSell = updateRepliedProductSellFunc;

// hot-tags
export const getHotTagsInOneDay = getHotTagsInOneDayFunc;
export const getHotTagsInOneMonth = getHotTagsInOneMonthFunc;
export const getHotTagsInOneWeek = getHotTagsInOneWeekFunc;
export const getPostScore = getPostScoreFunc;
export const getTagScore = getTagScoreFunc;
export const getTenHotTags = getTenHotTagsFunc;
export const updatePostScore = updatePostScoreFunc;
export const updateTagScore = updateTagScoreFunc;

// order
export const createOrder = createOrderFunc;
export const deleteOrder = deleteOrderFunc;
export const readOrder = readOrderFunc;
export const updateOrderStage = updateOrderStageFunc;

// product Buy
export const createProdBuy = createProdBuyFunc;
export const deleteProdBuy = deleteProdBuyFunc;
export const readMultipleRandomBuy = readMultipleRandomBuyFunc;
export const readProdBuy = readProdBuyFunc;
export const updateProdBuy = updateProdBuyFunc;

// product sell
export const createSellProduct = createSellProductFunc;
export const deleteSellProduct = deleteSellProductFunc;
export const readMultipleRandomSell = readMultipleRandomSellFunc;
export const readSellProduct = readSellProductFun;
export const updateSellProduct = updateSellProductFunc;

// search
export const searchPosts = searchPostsFunc;
export const searchProducts = searchProductsFunc;
export const searchTag = searchTagFunc;
export const searchUser = searchUserFunc;

// end here
