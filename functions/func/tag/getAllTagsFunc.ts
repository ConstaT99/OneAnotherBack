import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
Get all tags
Function returns the raw objects.
Inputs {
}
Output {
    all tag docs
}
 */

export const getAllTags = async () => {
  const snapshot = await db.collection('tag').get();
  const arrayOfTags = snapshot.docs.map((doc) => doc.data());
  return arrayOfTags;
};

export default functions.https.onCall(getAllTags);