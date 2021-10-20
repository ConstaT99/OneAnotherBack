import * as functions from 'firebase-functions';
import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';
import { readUser } from '../user/readUserFunc';

/*
TODO:
working on the phone and email verified
*/
export const addOrder = async (data: {
  sellerUid: string, // need expand field
  buyerUid: string, // need expand field
  price: number,
  orderType: boolean; // 0 for buy 1 for sell
  product: string;// need expand field
}) => {
  const { sellerUid, buyerUid, price } = data;
  if (!isUserExists({ uid: sellerUid })) {
    return Promise.reject(new Error('seller user is not exsit'));
  }
  if (!isUserExists({ uid: buyerUid })) {
    return Promise.reject(new Error('buyer user is not exsit'));
  }
  const sellerData = await readUser({ uid: sellerUid });
  const buyerData = await readUser({ uid: buyerUid });
  if (sellerData === undefined) {
    return Promise.reject(new Error('seller user is undefined'));
  }
  if (buyerData === undefined) {
    return Promise.reject(new Error('buyer user is undefined'));
  }
  const sellerName = sellerData.userName;
  const sellerRate = sellerData.rate;
  const sellerAvatar = sellerData.avatar;
  const buyerName = buyerData.userName;
  const buyerRate = buyerData.rate;
  const buyerAvatar = buyerData.avatar;

  // this two function can be use after deploy add user function
  // if (!isEmailVerified({ uid })) {
  //   return Promise.reject(new Error('Email is not verified'));
  // }
  // if (!isPhoneVerified({ uid })) {
  //   return Promise.reject(new Error('PhoneNumber is not verified'));
  // }

  const stage:number = 1; // 1: sending buy or sell request
  // 2: buyer or seller apporved request
  // 3: trading in progress
  // 4. buyer and seller confirmed payment
  // 5. order finished
  // 0. order cancelled

  const createTime: number = Math.floor(Date.now() / 1000);
  const comment: Array<string> = [];
  const commentNum: number = 0;

  const orderData = {
    sellerUid,
    sellerName,
    sellerRate,
    sellerAvatar,
    buyerUid,
    buyerName,
    buyerRate,
    buyerAvatar,
    createTime,
    price,
    comment,
    commentNum,
    stage,
  };

  const collection = 'order';
  const orderRef = db.collection(collection);
  return orderRef.add(orderData);
};

export default functions.https.onCall(addOrder);
