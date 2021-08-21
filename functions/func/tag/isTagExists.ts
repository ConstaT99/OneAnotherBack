import * as functions from 'firebase-functions';
import { db } from '../../db';

export const isTagExists = async(data:{
    name: string;
}) => {
    const collection = 'tag';
    const { name } = data;
    const tagRef = db.collection(collection);
    const snapshot = await tagRef.where('name', '==', name).get();
    console.log(snapshot);
        if (snapshot.size === 1) {
            return true;
        } else {
            return false;
        }

}

export default functions.https.onCall(isTagExists);