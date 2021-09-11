import * as functions from 'firebase-functions';
import { isPhoneVerified } from './checkPhoneVerified';
import { isEmailVerified } from './checkEmailVerifiedFuc';
import { isUserExists } from '../common/isUserExists';
import { db } from '../../db';
import { updateCat } from '../categories/updateCatFunc';
import { addTag } from '../tag/addTagFunc';

/*

*/
export const addProdSell = async (data: {
  uid: string,
  productName: string,
  price: string,
  description: string,
}) => {
  const {
    uid, productName, price, description, productName,
  } = data;
  if (!isUserExists({ uid })) {
    return Promise.reject(new Error('user is not exsit'));
  }
  if (!isEmailVerified({ uid })) {
    return Promise.reject(new Error('Email is not verified'));
  }
  if (!isPhoneVerified({ uid })) {
    return Promise.reject(new Error('PhoneNumber is not verified'));
  }

  if (description == null || productName == null) {
    return Promise.reject(new Error('Need description or Name provide '));
  }

  // product Name is all empty space
  if (/^\s*$/.test(productName) || productName === '') {
    return Promise.reject(new Error('Product Name is not valid'));
  }

  

  const { } = data;

  const productSellData = {
  };
  const collection = 'productSell';
  const postRef = db.collection(collection);
  const result = await postRef.add(productSellData);
  const taginfo = {
    name: tag,
    postId: result.id,
  };
  await addTag(taginfo);
  const catRefid = db.collection('categories');
  const snapshot = await catRefid.where('catName', '==', categories).get();
  const catId = snapshot.docs[0].id;

  await updateCat({ catId, postId: result.id });
  return result;
};

export default functions.https.onCall(addPost);
