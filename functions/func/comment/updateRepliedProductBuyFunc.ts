import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @Carstin copied from @Cath
Called when adding a comment that is replying to a productBuy.
A helper function for a productBuy to track its child comments
Input {
    productId: the id of the parent productBuy being updated,
    toAddId: the id of the child comment to be tracked
}
Output {
    the child comment id should be added into the parent productBuy's repliedBy array
}
*/

export const updateRepliedProductBuy = async (data: {
  productId: string,
  toAddId: string,
}) => {
  const { productId, toAddId } = data;
  const proRef = db.collection('productBuy').doc(productId);
  const proDoc = await proRef.get();
  if (proDoc === undefined) {
    return Promise.reject(new Error('invalid update, cannot read parent product post.'));
  }
  const proData = proDoc.data();
  // @ts-ignore
  if (proData.comment.indexOf(toAddId) === -1) {
    // @ts-ignore
    proData.comment.push(toAddId);
    // @ts-ignore
    proData.commentNum += 1;
    // @ts-ignore
    proRef.update({ comment: proData.comment, commentNum: proData.commentNum });
  }
  return proData;
};

export default functions.https.onCall(updateRepliedProductBuy);
