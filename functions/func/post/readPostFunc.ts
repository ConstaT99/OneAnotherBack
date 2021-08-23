import * as functions from 'firebase-functions';
import { db } from '../../db';


export const readPost = async (data:{
    postId: string;
}) => {
    const { postId } = data;
    if (postId == null) {
        return Promise.reject(new Error("post does not exist"));
    }
    const collection = 'post';
    const postRef = db.collection(collection).doc(postId);
    const postDoc = await postRef.get();
    return postDoc.data();
};
export default functions.https.onCall(readPost);