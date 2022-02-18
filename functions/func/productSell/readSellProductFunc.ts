import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for read product sell collection written by Jerry;
input:
    data:{
      prodId: string;
    }
output:
    promise<firebasefirestore.documentdata | undefined>
*/

export const readProdSell = async (data:{
  prodId: string;
}) => {
  const { prodId } = data;
  if (prodId == null) {
    return Promise.reject(new Error('product id is not given'));
  }
  const collection = 'productSell';
  const prodSellRef = db.collection(collection).doc(prodId);
  const prodDoc = await prodSellRef.get();
  if (!prodDoc.exists) {
    return Promise.reject(new Error(' product is not exist'));
  }
  return prodDoc.data();
};
export default functions.https.onCall(readProdSell);
