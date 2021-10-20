import * as functions from 'firebase-functions';
// import { isPhoneVerified } from './checkPhoneVerified';
// import { isEmailVerified } from './checkEmailVerifiedFuc';
import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';
import { readUser } from '../user/readUserFunc';

/*
TODO:
1.need to update location type
2. uncomment the verified status functions
3. need test
*/
export const addProdBuy = async (data: {
  uid: string,
  productName: string,
  targetPrice: string,
  description: string,
  image: [string];
  location: any;
}) => {
  const {
    uid, productName, targetPrice, description, image, location,
  } = data;
  if (!isUserExists({ uid })) {
    return Promise.reject(new Error('user is not exsit'));
  }
  // this two function can be use after deploy add user function
  // if (!isEmailVerified({ uid })) {
  //   return Promise.reject(new Error('Email is not verified'));
  // }
  // if (!isPhoneVerified({ uid })) {
  //   return Promise.reject(new Error('PhoneNumber is not verified'));
  // }

  if (description == null || productName == null) {
    return Promise.reject(new Error('Need description or Name provide '));
  }

  // product Name is all empty space
  if (/^\s*$/.test(productName) || productName === '') {
    return Promise.reject(new Error('Product Name is not valid'));
  }

  const createTime: number = Math.floor(Date.now() / 1000);
  const comment: Array<string> = [];
  const commentNum: number = 0;

  const buyerData = await readUser({ uid });
  if (buyerData === undefined) {
    return Promise.reject(new Error('buyer user is undefined'));
  }

  const buyerName = buyerData.userName;
  const buyerRate = buyerData.rate;
  const buyerAvatar = buyerData.avatar;

  const productSellData = {
    uid,
    buyerName,
    buyerRate,
    buyerAvatar,
    createTime,
    productName,
    description,
    image,
    targetPrice,
    location,
    comment,
    commentNum,
  };

  const collection = 'productBuy';
  const buyRef = db.collection(collection);
  return buyRef.add(productSellData);
};

export default functions.https.onCall(addProdBuy);
