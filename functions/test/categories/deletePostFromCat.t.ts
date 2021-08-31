import { expect } from 'chai';
import { db } from '../../db';
import { deletePostFromCat } from '../../func/categories/deletePostFromCatFunc';

describe('deletePostFromCat test', () => {
  it('the postId should be removed from the postArray in this category', async () => {
    const testData = {
      name: '兴趣',
      postId: 'abcd',
    };
    await deletePostFromCat(testData);
    const collection = 'categories';
    const catRefid = db.collection(collection);
    const snapshot = await catRefid.where('catName', '==', testData.name).get();
    const catId = snapshot.docs[0].id; // get the catId

    const docRef = await catRefid.doc(catId).get();
    // @ts-ignore
    expect(docRef.data().postArray).not.contain('abcd');
  });
  it('the postId should not be removed if it does not exists in this postArray', async () => {
    const testData = {
      name: '兴趣',
      postId: 'notExistsPostId',
    };
    await deletePostFromCat(testData)
      .then(() => {
        expect.fail('post does not exist in this tag');
      })
      .catch(() => {
        // nothing
      });
  });
});
