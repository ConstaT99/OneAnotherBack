import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @YH
Retrieve the entire school collection. i.e. all schools.
Function returns the raw objects.
Inputs {
}
Output {
    all school docs
}
 */

export const updateSchool = async () => {
  const snapshot = await db.collection('School').get();
  return snapshot.docs.map((doc) => doc.data());
};

export default functions.https.onCall(updateSchool);