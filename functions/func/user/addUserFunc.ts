/* eslint-disable @typescript-eslint/naming-convention */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { db } from '../../db'; // import timestamp class
/*
import * as functions from 'firebase-functions';
import { db } from '../../db';

A scratch function that adds user to cloud storage
Inputs:{
  user: UserRecord
}

properties can be checked at: https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord

Outputs: {
  return promise<string | Error>
}

Written by Jerry

TODO:
 1. userName should be unique
 */

export const addUser = async (user:UserRecord) => {
  const {
    uid, photoURL, email, phoneNumber, displayName,
  } = user;
  if (uid == null) {
    // console.log('uid is null or missing');
    return Promise.reject(new Error('no input for uid'));
  }
  const location = '';
  const avatar = photoURL;// avatar url
  const gender = 0; // 0 means unkwnon, 1 means female , 2 means male
  // profile
  const userName = displayName; // given a default
  const registerDate = admin.firestore.Timestamp.now(); // get current date
  const rate = 5; // 用户信誉分
  // post
  const postLike: Array<string> = []; //  喜欢的帖子 post/docId
  const post: Array<string> = []; // 发的帖子
  const postNum = 0; // 发帖个数
  const comment: Array<string> = []; // 评论 comment/docId
  const followPost : Array<string> = []; // 关注的post post/docId
  const savedPost:string[] = [];
  // friend
  const followBy: Array<string> = [];// 关注我的用户 user/docId
  const followingList : Array<string> = []; // 关注的其他用户 user/docId
  // resell
  const wantToSell: Array<string> = [];// 售卖栏
  const sold: Array<string> = [];// 卖掉物品列表 producsell/docId
  const soldNum = 0;// 卖掉物品个数

  const bought:Array<string> = [];// 购买的物品 productBuy/docId
  const boughtNum = 0; // 购买物品个数
  const cart: Array<string> = [];// 购物车
  const wantToBuy: Array<string> = [];// 求购

  const order: Array<string> = []; // 订单列表 order/docId
  // 验证
  const student:boolean = false; // by default the student status will unverify which is 0;
  const realName:boolean = false; // by default the real status will unverify which is 0;
  const school:string = ''; // if student is 1 this school will fill in the name of school;

  const blackUserList:string[] = [];
  const blackPostList:string[] = [];

  const userInfo = {
    userName,
    uid,
    avatar,
    email,
    gender,
    phoneNumber,
    location,
    registerDate,
    rate,
    postLike,
    post,
    postNum,
    comment,
    followPost,
    savedPost,
    followBy,
    followingList,
    sold,
    soldNum,
    bought,
    boughtNum,
    order,
    wantToBuy,
    wantToSell,
    student,
    realName,
    school,
    cart,
    blackUserList,
    blackPostList,
  };
  const collection = 'user';
  const userRef = db.collection(collection);
  return new Promise< string | Error >((resolve, reject) => {
    userRef.doc(uid).set(userInfo).then(() => {
      resolve(`user ${uid} created the data successfully.`);
    }).catch((error) => {
      reject(error);
    });
  });
};

export default functions.auth.user().onCreate(addUser);
