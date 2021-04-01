import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from OneAnother!");
});
