/* eslint-disable import/prefer-default-export */
import * as functions from 'firebase-functions';
import { db } from '../../db';
/* This is file contain function display Hello World in the web */

export const readTestTemplate = functions.https.onRequest(async (request, response) => {
  functions.logger.info('this is read onrequest Example Function');
  const docID = request.query.docID as string; // get uid from url
  const collection = 'test';
  if (typeof docID === 'undefined') {
    response.status(404).send('Invalid URL');
  }
  const testRef = db.collection(collection).doc(docID);
  const testDoc = await testRef.get();
  functions.logger.info(docID);
  response.send(testDoc.data());
});

// url example https://us-central1-oneanother-757c7.cloudfunctions.net/readTestTemplate?docID=4JH6mIHpiznT0PH27kUJ