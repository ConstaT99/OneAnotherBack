import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
This function returns the raw tag object by a docID.
Inputs {
    refId: the ID of tag
}
Output {
    the tag doc
}
 */

export const getTagById = async (data:{
  tagId : string;
}) => {
  const tagRef = db.collection('tag').doc(data.tagId);
  const tagDoc = await tagRef.get();
  return tagDoc.data();
};

export default functions.https.onCall(getTagById);
