import * as functions from 'firebase-functions';
import { db } from '../../db';

export const isUserExist = async(data:{
    uid: string;
}) => {
    const collection = 'user';
    const userRef = db.collection(collection);
    const { uid } = data;
    if (userRef.doc(uid)){
        return true;
    }else{
        return false;
    }
}

export default functions.https.onCall(isUserExist);