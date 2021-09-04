import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
get twenty hot tags which updated within 1 month
Input {
    none
}
Output {
    the array of 20 hotest tags within 1 month, highest score to lowest score
}
*/

export const getHotTagsInOneMonth = async () => {
    const currenttime = Math.floor(Date.now() / 1000);
    const time = currenttime - 2592000;
    const tagCollection = db.collection('tag');
    const snapshot = await tagCollection.where('lastUpdate', '>=', time).get();
    const arrayOfTag = snapshot.docs.map((doc) => doc.data());
    const sortedArrayOfTag = arrayOfTag.sort((n1, n2) => { // sort the Array in desc order
    if (n1.tagScore > n2.tagScore) {
        return -1;
    }
    if (n1.tagScore < n2.tagScore) {
        return 1;
    }
    return 0;
    });
    const arraylength = sortedArrayOfTag.length;
    if (arraylength >= 20) {
        const outArray = [];
        let i = 0;
        while (i < 20) {
          outArray.push(sortedArrayOfTag[i]);
          i += 1;
        }
        return outArray;
      }
    return sortedArrayOfTag;
}

export default functions.https.onCall(getHotTagsInOneMonth);