/* eslint-disable no-unused-vars */
import * as functions from "firebase-functions";
import {db} from "../db";

/* This is a Sample Read Function for Cloud function development */

export const readExample = async (data:{
    docID: string;
    field: string;
})=> {
  functions.logger.info("this is read Example Function");

  const {docID, field} = data;// get the value
  const collection = "test";
  const testRef = db.collection(collection).doc(docID);
  const testDoc = await testRef.get();

  return await new Promise((resolve, reject)=>{
    const testData = testDoc.data();
    if (!testData) {
      reject(new Error("Example Read failed: at collection [" + collection +"] with docID [" + docID +"]."));
      return;
    } else {
      const testField = field ? testData[field] : testData;
      resolve(testField);
    }
  });
};

export default functions.https.onCall(readExample);
