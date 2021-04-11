/* eslint-disable import/prefer-default-export */
import * as functions from 'firebase-functions';
/* This is file contain function display Hello World in the web */

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from OneAnother!');
});
