import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Cath
Given the docId, this function will return the entire comment object.
Inputs {
  commentId: the ID of tag
}
Output {
  the comment doc
}
*/

export const getCommentFunc = async (tagId: string) => {
    const commentRef = db.collection('comment').doc(tagId);
    const commentDoc = await commentRef.get();
    return commentDoc.data();
};

export default functions.https.onCall(getCommentFunc);