import * as functions from 'firebase-functions';
import { readOrder } from './readOrderFunc';
import updateOrder from './updateOrderFunc';

/*
This is oncall function for delete order  written by Jerry;
This function will not delete order in collection since it is going to change the stage to cancelled stage.
input:
    data:{
      uid: string;
      orderId: string;
    }
output:
    updateorder with change stage to 0
*/
export const deleteOrder = async (data: {
  uid: string;
  orderId: string
}) => {
  const {
    uid, orderId,
  } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid does not exist'));
  }
  const orderData = await readOrder({ orderId });
  if (orderData === undefined) {
    return Promise.reject(new Error('order data is undefined'));
  }
  const { buyerUid } = orderData;
  const { sellerUid } = orderData;
  if (uid !== buyerUid && uid !== sellerUid) {
    return Promise.reject(new Error('you do not have premission to cancelled thie order'));
  }
  const currentStage = orderData.stage;
  if (currentStage === 0) {
    return Promise.reject(new Error('order has been cancelled already no need to do it second time'));
  }
  const cancelledStage = 0;
  return updateOrder({
    orderId,
    updateField: 'stage',
    updateContext: cancelledStage,
  });
};

export default functions.https.onCall(deleteOrder);
