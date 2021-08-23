import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author @Carstin
check if the user already exists in the user db (dont know why it is needed)
Input {
    uid: the uid of the user you wanna check
}
Output {
    the user exists: true
    the user doesn't exists: false
}
*/

export const isUserExists = async(data:{
    uid: string;
}) => {
    const collection = 'user';
    const { uid } = data;
    const userRef = db.collection(collection);
    const snapshot = await userRef.where('uid', '==', uid).get();
    if (snapshot.size === 1) {
        return true;
    } else {
        return false;
    }
};

export default functions.https.onCall(isUserExists);