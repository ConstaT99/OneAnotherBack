import * as functions from 'firebase-functions';
import { db } from '../../db';

export const isUserExists = async(data:{
    uid: string;
}) => {
    const collection = 'user';
    const { uid } = data;
    const userRef = db.collection(collection).doc(uid);
    return userRef.get().then((doc) => {
        if (doc.exists){
            return true;
        } else {
            return false;
        }
    });
}

export default functions.https.onCall(isUserExists);