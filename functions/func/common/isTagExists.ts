
import * as functions from 'firebase-functions';
import { db } from '../../db';

export const isTagExists = async(data:{
    name: string;
}) => {
    const collection = 'tag';
    const tagRef = db.collection(collection);
    const { name } = data;
    if (tagRef.doc(name)){
        return true;
    }else{
        return false;
    }
}

export default functions.https.onCall(isTagExists);