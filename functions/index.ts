import * as functions from "firebase-functions";
// import {helloWorld} from "./func/template/helloWorld";
// import cors from 'cors';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from OneAnother!");
});

// export default functions.https.onRequest(helloWorld);
