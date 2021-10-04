import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author: @Carstin
serve as a delete function, in order to disable the tag
!TODO: TEST NEEDED!
input {
    tagId: the id of the tag
    access : true(able to access) false(unable to access)
}
output {
    promise<writeresult>
}
*/
export const updateTagStat = async (data:{
  tagId: string
  access: boolean
}) => {
  const { tagId, access } = data;
  if (tagId === null) {
    return Promise.reject(new Error('tagId does not exist'));
  }
  const collection = 'tag';
  const userRef = db.collection(collection).doc(tagId);
  return userRef.update({ access });
};

export default functions.https.onCall(updateTagStat);