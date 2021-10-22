import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
This is oncall function for get random 20  productBuy products written by Jerry;
Input {
  prebuyId: the postId of the last post in previous call
    null for first time calling this func.
}
Output {
  prodArray: limit 20 posts max for each call
}
*/

export const readMultipleRandomBuy = async (data:{
  prebuyId: string;
}) => {
  const { prebuyId } = data;
  const collection = 'productBuy';
  const buyRef = db.collection(collection);
  let buyGet;
  let buyData;
  if (prebuyId === '') {
    buyGet = await buyRef.orderBy('createTime', 'desc').limit(20).get();
    buyData = buyGet.docs.map((doc) => doc.data());
    return buyData;
  }
  const preBuyRef = db.collection(collection).doc(prebuyId);
  const preBuyDoc = await preBuyRef.get();
  const preBuyData = preBuyDoc.data();
  if (!preBuyData) {
    return Promise.reject(new Error('buyData could not be reached'));
  }
  buyGet = await buyRef.orderBy('createTime', 'desc')
    .startAfter(preBuyDoc)
    .limit(20)
    .get();
  buyData = buyGet.docs.map((doc) => doc.data());
  return buyData;
};
export default functions.https.onCall(readMultipleRandomBuy);
