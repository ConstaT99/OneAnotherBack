import * as functions from 'firebase-functions';
import { db } from '../../db';

export const getPicOfPost = async (data:{
    docId: string
}) => {
    const {docId} = data;
    const postRef = db.collection('post').doc(docId);
    const postDoc = await postRef.get();
    const postData =  postDoc.data();


    return new Promise((resolve, reject) => {
        if (!postData) {
            reject(new Error(`postData Read failed: at collection post with docID [${docId}].`));
        } else {
            const pic = 'picture' ? postData['picture'] : postData;
            const url = pic[0];
            resolve(url);
        }
    });
};

export default functions.https.onCall(getPicOfPost);