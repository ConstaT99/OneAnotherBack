import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
get Ten hot tags which updated within 7 days
Input {
    none
}
Output {
    the array of 10 hotest tags within 7 days, highest score to lowest score
}
*/

export const getTenHotTags = async () => {
  const currenttime = Math.floor(Date.now() / 1000);
  const time = currenttime - 604800;
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

  if (arraylength >= 10) {
    const outArray = [];
    let i = 0;
    while (i < 10) {
      outArray.push(sortedArrayOfTag[i]);
      i += 1;
    }
    return outArray;
  }
  return sortedArrayOfTag;
};

export default functions.https.onCall(getTenHotTags);
