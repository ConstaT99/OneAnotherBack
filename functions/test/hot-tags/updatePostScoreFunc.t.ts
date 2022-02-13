// import { expect } from 'chai';
// import { db } from '../../db';
import { updatePostScore } from '../../func/hot-tags/updatePostScoreFunc';

describe('updatePostScoreFunc test', () => {
  it('the post score should be updated to the data base', async () => {
    const testData = {
      postId: 'AzhrPXIzlmD356r6D1lC',
    };
    const out = await updatePostScore(testData);
    // const postRef = db.collection('post').doc(testData.postId);
    // const postDoc = await postRef.get();
    // const postData = postDoc.data();
    // // @ts-ignore
    // const { postScore } = postData;
    // // 41.25 post score
    // // @ts-ignore
    // expect(postScore).to.equal(41.25);
    console.log(out);
  });

  it('another post test', async () => {
    const testData = {
      postId: 'GTow7mQbg2pBXV9xISwz',
    };
    const out = await updatePostScore(testData);
    console.log(out);
    // const postRef = db.collection('post').doc(testData.postId);
    // const postDoc = await postRef.get();
    // const postData = postDoc.data();
    // // @ts-ignore
    // const { postScore } = postData;
    // // 41.25 post score
    // // @ts-ignore
    // expect(postScore).to.equal(41.25);
  });
});
