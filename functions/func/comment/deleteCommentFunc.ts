import * as functions from 'firebase-functions';
import { getCommentFunc } from './getCommentFunc';
import { db } from '../../db';

/*
Author @Cath
Given the docId, delete the corresponding comment.
input:
    data:{
      commentId: string;
    }
output:
    promise<writeresult>
*/

export const deleteCommentFunc = async (commentId: string) => {
    const commentExists = await getCommentFunc(commentId);
    if (!commentExists) {
        return Promise.reject(new Error('comment does not exist'));
    }
    const collection = 'comment';
    const commentRef = db.collection(collection).doc(commentId);
    return commentRef.delete();
};

export default functions.https.onCall(deleteCommentFunc);