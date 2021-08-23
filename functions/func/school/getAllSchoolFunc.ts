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

export const getAllSchool = async () => {
  const snapshot = await db.collection('school').get();
  const arrayOfSchool = await snapshot.docs.map((doc) => doc.data());
  return arrayOfSchool;
};

export default functions.https.onCall(getAllSchool);
