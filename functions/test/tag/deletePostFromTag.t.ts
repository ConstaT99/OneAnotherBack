import { expect } from 'chai';
import { db } from '../../db';
import { deletePostFromTagFunc } from '../../func/tag/deletePostFromTagFunc';

describe('deletePostFromTag test', () => {
  it('the postId should be removed from the posts in this tag', async () => {
    const testData = {
      name: '香槟美食',
      postId: 'wR9n7Q6vF5i1kaep0tuq',
    };
    await deletePostFromTagFunc(testData);
    const collection = 'tag';
    const catRefid = db.collection(collection);
    const snapshot = await catRefid.where('name', '==', testData.name).get();
    const catId = snapshot.docs[0].id; // get the catId

    const docRef = await catRefid.doc(catId).get();
    // @ts-ignore
    expect(docRef.data().posts).not.contain('abcd');
  });
  it('the postId should not be removed if it does not exists in this tag', async () => {
    const testData = {
      name: '香槟美食',
      postId: 'notExistsPostId',
    };
    await deletePostFromTagFunc(testData)
      .then(() => {
        expect.fail('post does not exist in this tag');
      })
      .catch(() => {
      });
  });
});