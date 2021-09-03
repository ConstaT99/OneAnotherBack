import * as functions from 'firebase-functions';
import { db } from '../../db';
import { getTagScore } from './getTagScore';
/*
Author @Carstin
update the tag score to the tag collection's tagScore
Input {
    tagId: the id of the tag you want to update
}
Output {
    promise<writeresult>
}
*/
export const updateTagScore = async (data: {
  tagId: string;
}) => {
  const { tagId } = data;
  if (tagId == null) {
    return Promise.reject(new Error('postId does not exist'));
  }
  const tagRef = db.collection('tag').doc(tagId);
  const tagDoc = await tagRef.get();
  const tagData = tagDoc.data();
  if (!tagData) {
    return Promise.reject(new Error('postData does not exist'));
  }
  const tagScore = await getTagScore({ tagId });

  return tagRef.update({ tagScore });
};

export default functions.https.onCall(updateTagScore);
