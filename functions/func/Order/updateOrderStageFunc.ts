import * as functions from 'firebase-functions';
import { readOrder } from './readOrderFunc';
import updateOrder from './updateOrderFunc';

/*
This is oncall function for update order stage written by Jerry;
input:
    data:{
      orderId: string;
    }
output:
    promise<firebasefirestore.documentdata | undefined>
*/

export const updateStage = async (data: {
  orderId: string;
}) => {
  const { orderId } = data;
  if (orderId == null) {
    return Promise.reject(new Error('order id is not given'));
  }
  const orderData = await readOrder({ orderId });
  if (orderData === undefined) {
    return Promise.reject(new Error('order data does not read'));
  }
  const currentStage = orderData.stage;
  if (currentStage === 0) { // check the order has been cancelled
    return Promise.reject(new Error('the order has been cancelled no furture action needed'));
  }
  const nextStage = currentStage + 1;
  if (nextStage > 5) { // no more stage above 5
    return Promise.reject(new Error('unkown error occur, incorrect stage'));
  }
  return updateOrder({
    orderId,
    updateField: 'stage',
    updateContext: nextStage,
  });
};
export default functions.https.onCall(updateStage);
