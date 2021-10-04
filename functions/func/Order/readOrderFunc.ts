import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for read order collection written by Jerry;
input:
    data:{
      orderId: string;
    }
output:
    promise<firebasefirestore.documentdata | undefined>
*/

export const readOrder = async (data: {
    orderId: string;
}) => {
    const { orderId } = data;
    if (orderId == null) {
        return Promise.reject(new Error('order id is not given'));
    }
    const collection = 'order';
    const orderRef = db.collection(collection).doc(orderId);
    const orderdDoc = await orderRef.get();
    if (!orderdDoc.exists) {
        return Promise.reject(new Error(' order is not exist'));
    }
    return orderdDoc.data();
};
export default functions.https.onCall(readOrder);
