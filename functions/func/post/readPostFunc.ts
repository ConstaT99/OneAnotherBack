import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for update user profile written by Cath;
input:
    data:{
      postId: string;
    }
output:
    promise<firebasefirestore.documentdata | undefined>
*/

export const readPostRequest = functions.https.onRequest(async (request,response) =>{
  functions.logger.info("this is a read post function");
  const postId = request.query.postId as string; // get uid from url
  const collection = "post";
  if (typeof postId === "undefined"){
    response.status(404).send('Invalid URL');
  }
  const postRef = db.collection(collection).doc(postId);
  const postDoc = await postRef.get();
  functions.logger.info(postId);
  response.send(postDoc.data());
});




