import * as functions from 'firebase-functions';
import { db } from '../../db';

/* This is a Sample Create Function for Cloud function development */
export const addExample = async (data:{
  sampleId: string;
  text: string;
}) => {
  // const { sampleId, text} = data; // get value in data.
  const collection = 'test';
  functions.logger.info('this is add Example Function');
  const testRef = db.collection(collection);
  // this will return ref
  return testRef.add(data);
};

export default functions.https.onCall(addExample);
