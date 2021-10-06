import * as functions from 'firebase-functions';
import { db } from '../../db';

export const saveTag = async(data:{
    uid: string,
    tagName: string,
}) => {
    const {uid, tagName} = data;
    const userRef = db.collection('user').doc(uid);
    const userDoc = await userRef.get();
    
}