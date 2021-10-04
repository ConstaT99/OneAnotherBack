import * as functions from 'firebase-functions';
import { db } from '../../db';

export const getSubComment = async (data:{
    replyId: string;
}) => {
    const {replyId} = data;
    const collection = 'comment';
    const comRef = db.collection(collection);
    const commentGet = await comRef.where('replyId', '==', replyId).get();
    const commentsData = commentGet.docs.map((doc) => doc.data());
    return commentsData;
}
export default functions.https.onCall(getSubComment);