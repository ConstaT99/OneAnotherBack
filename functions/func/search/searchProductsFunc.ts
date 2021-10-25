import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author: @Carstin
Search matched name products
Input {
    input: the user input
    preProductId: the productId of the last product in previous call
    empty for first time calling this func.
    buy : true for 'productBuy' false for 'productSell'
}
Output {
    productData array
}
*/

export const searchProduct = async (data:{
  input: string;
  preProductId: string;
  buy: boolean;
}) => {
  const { input, preProductId, buy } = data;
  let collection;
  if (buy === true) {
    collection = 'productBuy';
  } else {
    collection = 'productSell';
  }
  const proRef = db.collection(collection);
  let productGet;
  if (preProductId === '') {
    productGet = await proRef.where('productName', '>=', input)
      .where('productName', '<=', `${input}\uf8ff`)
      .limit(10)
      .get();
    const postsData = productGet.docs.map((doc) => doc.data());
    return postsData;
  }
  const preProRef = db.collection(collection).doc(preProductId);
  const preProDoc = await preProRef.get();
  const preProData = preProDoc.data();
  if (!preProData) {
    return Promise.reject(new Error('productData could not be reached'));
  }

  productGet = await proRef.where('productName', '>=', input)
    .where('productName', '<=', `${input}\uf8ff`)
    .startAfter(preProDoc)
    .limit(10)
    .get();
  const postsData = productGet.docs.map((doc) => doc.data());
  return postsData;
};
export default functions.https.onCall(searchProduct);
