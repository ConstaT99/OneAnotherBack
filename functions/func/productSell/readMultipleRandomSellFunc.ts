import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
This is oncall function for get random 20  productSell products written by Jerry;
Input {
  preSellId: the postId of the last post in previous call
    null for first time calling this func.
}
Output {
  prodArray: limit 20 posts max for each call
}
*/

export const readMultipleRandomSell = async (data: {
    preSellId: string;
}) => {
    const { preSellId } = data;
    const collection = "productSell";
    const sellRef = db.collection(collection);
    var sellGet;
    var sellData;
    if (preSellId === '') {
        sellGet = await sellRef.orderBy("createTime", "desc").limit(20).get();
        sellData = sellGet.docs.map((doc) => doc.data());
        return sellData;
    }
    const presellRef = db.collection(collection).doc(preSellId);
    const preSellDoc = await presellRef.get();
    const preSellData = preSellDoc.data();
    if (!preSellData) {
        return Promise.reject(new Error('SellData could not be reached'));
    }
    sellGet = await sellRef.orderBy("createTime", "desc")
        .startAfter(preSellDoc)
        .limit(20)
        .get();
    sellData = sellGet.docs.map((doc) => doc.data());
    return sellData;
}
export default functions.https.onCall(readMultipleRandomSell);