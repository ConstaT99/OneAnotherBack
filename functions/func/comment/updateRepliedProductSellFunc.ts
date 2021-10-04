import * as functions from 'firebase-functions';
import { db } from '../../db';

export const updateRepliedProductSell = async (data: {
    productId: string,
    toAddId: string,
  }) => {
    const { productId, toAddId } = data;
    const proRef = db.collection('productSell').doc(productId);
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
  
  export default functions.https.onCall(updateRepliedProductSell);