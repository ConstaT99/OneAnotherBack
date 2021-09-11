import { db } from '../../db';
import * as functions from 'firebase-functions';

/*
Author @Carstin
read multiple hot posts in this one func
*/
export const readMultipleHotPosts = async (data:{
    prePostId : string;
}) => {
    const { prePostId } = data;
    if (prePostId == "") {
        const collection = 'post';
        const postRef = db.collection(collection);
        const postGet = await postRef.orderBy("postScore", "desc").limit(10).get();
        const postsData = postGet.docs.map((doc) => doc.data());
        return postsData;

    } else {
        const collection = 'post';
        const postRef = db.collection(collection);
        const postGet = await postRef.orderBy("postScore", "desc").startAfter(prePostId).limit(10).get();
        const postsData = postGet.docs.map((doc) => doc.data());
        return postsData;
    }

};
export default functions.https.onCall(readMultipleHotPosts);