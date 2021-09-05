import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
return a postArray which contains all of the postId under this tag
Input{
    tagName: the name of the Tag you wanna find
}
Output {
    return the postArray under this TAG
}
*/
export const getPostsByTags = async (data:{
  tagName: string;
}) => {
  const collection = 'tag';
  const { tagName } = data;
  const catRef = db.collection(collection);
  const snapshot = await catRef.where('name', '==', tagName).get();
  const tagData = snapshot.docs[0].data();
  return tagData.posts;
};
export default functions.https.onCall(getPostsByTags);
