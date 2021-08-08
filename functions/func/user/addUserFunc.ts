import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { db } from '../../db'; // import timestamp class

/*
import * as functions from 'firebase-functions';
import { db } from '../../db';

A scratch function that adds user to cloud storage
Inputs: user: UserRecord
properties can be checked at: https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord

Outputs: {
  return result of catch
}

Written by Jerry

TODO: userName should be unique
 */

export const addUser = async (user:UserRecord) => {
  const {
    uid, photoURL, email, phoneNumber,
  } = user;
  if (uid == null) {
    console.log('uid is null or missing');
    return false;
  }
  // if (photoURL == null) {
  //   photoURL = 'default avatar'; // need to fill in a url with default avatar
  // }
  // if(email == null){
  //   email = ""; // when its empty its email is not provide
  // }
  // if(phoneNumber == null){
  //   phoneNumber = "";// if “” then phoneNumber is not provide
  // }

  const location = '';
  const avatar = photoURL;// avatar url
  const gender = 'Unknown';
  // profile
  const userName = uid; // given a default
  const registerDate = admin.firestore.Timestamp.now(); // get current date
  const rate = 0; // 用户信誉分
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
  const student = 0; // by default the student status will unverify which is 0;
  const realName = 0; // by default the real status will unverify which is 0;
  const school = ''; // if student is 1 this school will fill in the name of school;

  const userInfo = {
    userName,
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
  };
  const collection = 'user';
  const userRef = db.collection(collection);
  return userRef.doc(uid).set(userInfo).catch(console.error);
};

export default functions.auth.user().onCreate(addUser);
