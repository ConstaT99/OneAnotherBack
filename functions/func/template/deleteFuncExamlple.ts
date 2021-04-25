/* eslint-disable no-unused-vars */

import * as functions from 'firebase-functions';
import { db } from '../../db';

/* This is a Sample Delete Function for Cloud function development */

export const deleteExample = async (data:{
  docID: string;
}) => {
  functions.logger.info('this is delete Example Function');

  const { docID } = data; // get the value
  const collection = 'test';
  const testRef = db.collection(collection).doc(docID);
  //   const testDoc = await testRef.get();

  return testRef.delete();
};

export default functions.https.onCall(deleteExample);
