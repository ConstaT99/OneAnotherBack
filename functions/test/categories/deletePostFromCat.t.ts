import { expect } from 'chai';
import { db } from '../../db';
import { deletePostFromCat } from '../../func/categories/deletePostFromCatFunc';

describe('deletePostFromCat test', () => {
  it('the postId should be removed from the postArray in this category', async () => {
    const testData = {
      catId: '6qt1xEqTL2pI9J1ACBEe',
      postId: 'abcd',
    };
    await deletePostFromCat(testData);

    const collection = 'categories';
    const catRef = db.collection(collection).doc(testData.catId);
    const docRef = await catRef.get();
    const catData = docRef.data();
    // @ts-ignore
    expect(catData.postArray).not.contain('abcd');
  });
  it('the postId should not be removed if it does not exists in this postArray', async () => {
    const testData = {
      catId: '6qt1xEqTL2pI9J1ACBEe',
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
