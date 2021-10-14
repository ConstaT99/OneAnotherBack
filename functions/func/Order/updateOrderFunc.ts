import { db } from '../../db';

/*
This is  function for update order collection data  written by Jerry;
input:
    data:{
      orderId: string;
      updateField: string;
      updateContext: any;
    }
output:
    promise<writeresult>
*/
const updateOrder = async (data: {
  orderId: string;
  updateField: string;
  updateContext: any;
}) => {
  const { orderId, updateField, updateContext } = data;// get the value
  if (orderId == null) {
    return Promise.reject(new Error('uid is not exist'));
  }
  if (updateField == null || updateContext == null) {
    return Promise.reject(new Error('update info is missing'));
  }
  const collection = 'order';
  const userRef = db.collection(collection).doc(orderId);
  return userRef.update({ [updateField]: updateContext });
};

export default updateOrder;
