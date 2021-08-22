import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
Retrieve ten hottest tags
Function returns the array of tag Name
Inputs {
}
Output {
    all tag docs
}
*/

export const getTenTagFunc = async () => {
    const snapshot = await db.collection('tag').get();
    const arrayOfTag = snapshot.docs.map((doc) => doc.data());
    return arrayOfTag;
};
  
export default functions.https.onCall(getTenTagFunc);