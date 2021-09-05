import { expect } from 'chai';
import { db } from '../../db';
import { updatePostScore } from '../../func/hot-tags/updatePostScoreFunc';

describe('updatePostScoreFunc test', () => {
  it('the post score should be updated to the data base', async () => {
    const testData = {
      postId: 'wR9n7Q6vF5i1kaep0tuq',
    };
    await updatePostScore(testData);
    const postRef = db.collection('post').doc(testData.postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    // @ts-ignore
    const { postScore } = postData;
    // 41.25 post score
    // @ts-ignore
    expect(postScore).to.equal(41.25);
  });

  it('another post test', async () => {
    const testData = {
      postId: 'Vsx8kJVfwHCKBVXOWnv5',
    };
    await updatePostScore(testData);
    const postRef = db.collection('post').doc(testData.postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    // @ts-ignore
    const { postScore } = postData;
    // 41.25 post score
    // @ts-ignore
    //expect(postScore).to.equal(41.25);
  });
});
