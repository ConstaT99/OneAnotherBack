import * as functions from 'firebase-functions';
import { db } from '../../db';

export const getDirectComment = async (data:{
    postId: string;
    limit: number;
}) => {
    const {postId, limit} = data;
    const collection = 'comment';
    const comRef = db.collection(collection);
    if (limit == 0) {
        const commentGet = await comRef.where('replyId', '==', postId).get();
        const commentsData = commentGet.docs.map((doc) => doc.data());
        return commentsData;
        
    }
    const commentGet = await comRef.where('replyId', '==', postId).limit(limit).get();
    const commentsData = commentGet.docs.map((doc) => doc.data());
    return commentsData;
}
export default functions.https.onCall(getDirectComment);