import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isUidCorrect } from '../productSell/checkUidInDoc';

/*
This is oncall function for delete productBuy  written by Jerry;
input:
    data:{
    uid: string;
    prodId: string;
    }
output:
    promise<writeresult>
*/
export const deleteProdBuy = async (data: {
  uid: string;
  prodId: string;
}) => {
  const {
    uid, prodId,
  } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid does not exist'));
  }
  // this function need check
  if (!isUidCorrect({ uid, collection: 'productBuy', docId: prodId })) {
    return Promise.reject(new Error('you do not have premission to update this'));
  }
  const collection = 'productBuy';
  const prodBuyRef = db.collection(collection).doc(prodId);

  // TODO: need check to delete reply

  return prodBuyRef.delete();
};

export default functions.https.onCall(deleteProdBuy);
