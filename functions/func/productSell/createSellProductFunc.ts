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
export const addProdSell = async (data: {
  uid: string,
  productName: string,
  price: string,
  description: string,
  status: number;
  image: [string];
  location: any;
  auction: boolean;
  doneDeal: number;
}) => {
  const {
    uid, productName, price, description, status, image, location, auction, doneDeal
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

  if (status > 10 && status < 0) {
    return Promise.reject(new Error('enter the valid number 0 ~ 10'));
  }

  const createTime: number = Math.floor(Date.now() / 1000);
  const archieve: boolean = false;
  const comment:Array<string> = [];
  const commentNum:number = 0;

  const sellerData = await readUser({ uid });
  if (sellerData === undefined) {
    return Promise.reject(new Error('buyer user is undefined'));
  }

  const sellerName = sellerData.userName;
  const sellerRate = sellerData.rate;
  const sellerAvatar = sellerData.avatar;
  const score = sellerData.score;

  let productSellData;
  if (!auction) {
    productSellData = {
      uid,
      sellerName,
      sellerRate,
      sellerAvatar,
      createTime,
      productName,
      description,
      status,
      image,
      price,
      location,
      archieve,
      comment,
      commentNum,
      score,
    };
  } else {
    const auctionStartPrice = price;
    const auctionIncrementPrice: number = 1;
    const auctionStartTime: number = createTime;
    const auctionEndTime: number = createTime + 604800;// 604800 stand for 7 days by default
    productSellData = {
      uid,
      sellerName,
      sellerRate,
      sellerAvatar,
      createTime,
      productName,
      description,
      status,
      image,
      price,
      location,
      archieve,
      auctionStartPrice,
      auctionIncrementPrice,
      auctionStartTime,
      auctionEndTime,
      comment,
      commentNum,
      doneDeal,
    };
  }

  const collection = 'productSell';
  const sellRef = db.collection(collection);
  return sellRef.add(productSellData);
};

export default functions.https.onCall(addProdSell);
