import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for read product buy collection written by Jerry;
input:
    data:{
      prodId: string;
    }
output:
    promise<firebasefirestore.documentdata | undefined>
*/

export const readProdBuy = async (data: {
  prodId: string;
}) => {
  const { prodId } = data;
  if (prodId == null) {
    return Promise.reject(new Error('product id is not given'));
  }
  const collection = 'productBuy';
  const prodBuyRef = db.collection(collection).doc(prodId);
  const prodDoc = await prodBuyRef.get();
  if (!prodDoc.exists) {
    return Promise.reject(new Error(' product is not exist'));
  }
  return prodDoc.data();
};
export default functions.https.onCall(readProdBuy);
