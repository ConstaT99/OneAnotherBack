import { db } from '../../db';
import * as functions from 'firebase-functions';

export const readMultipleRandomPosts = async (data:{
    prePostId: string;
}) => {
    const { prePostId } = data;
    if (prePostId.length == 0) {
        const collection = 'post';
        const postRef = db.collection(collection);
        const postGet = await postRef.where('postScore', '>', '25').limit(10).get();
        const postsData = postGet.docs.map((doc) => doc.data());
        return postsData;

    } else {
        const collection = 'post';
        const postRef = db.collection(collection);
        const postGet = await postRef.where('postScore', '>', '25').startAfter(prePostId).limit(10).get();
        const postsData = postGet.docs.map((doc) => doc.data());
        return postsData;
    }
};

export default functions.https.onCall(readMultipleRandomPosts);