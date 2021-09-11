import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isUidCorrect } from './checkUidInDoc';

/*
This is oncall function for update productSell  written by Jerry;
input:
    data:{
      uid: string;
      prodId: string;
      updateField: string;
      updateContext: any;
    }
output:
    promise<writeresult>
*/
export const updateProdSell = async (data: {
  uid: string;
  prodId: string;
  updateField: string;
  updateContext: any;
}) => {
  const {
    uid, prodId, updateField, updateContext,
  } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid does not exist'));
  }
  if (updateField == null || updateContext == null) {
    return Promise.reject(new Error('update info is missing'));
  }
  // this function need check
  if (!isUidCorrect({ uid, collection: 'productSell', docId: prodId })) {
    return Promise.reject(new Error('you do not have premission to update this'));
  }
  const collection = 'productSell';
  const prodSellRef = db.collection(collection).doc(prodId);
  return prodSellRef.update({ [updateField]: updateContext });
};

export default functions.https.onCall(updateProdSell);
